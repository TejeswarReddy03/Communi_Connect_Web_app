const express = require('express');
const path = require('path');
const cors = require("cors");
const db = require('./config/mongoose');
const port = 8004;
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const usersController = require('./controllers/users_controller');
const { translate } = require('bing-translate-api');
const crypto = require('crypto');
const MongoStore = require('connect-mongo')(session);
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxs9co3sw',
  api_key: '916565758543593',
  api_secret: 'I5iivkukEGt54Qx4wpop-tAzggg'
});
const nodemailer = require('nodemailer');
const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const User = require("./models/user");
const Announcements = require("./models/announcements");
const Post = require("./models/posts");
const Markers = require("./models/maps");
const Poll=require('./models/polls');
const Conversations = require('./models/conversation');
const Messages = require('./models/messages');
const dotenv = require('dotenv'); // Load dotenv package

dotenv.config();
app.use(cors());
app.use(session({
  name: 'codeial',
  secret: 'xyz',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore(
    {
      mongooseConnection: db,
      autoremove: 'disabled'
    },
    function (err) {
      console.log(err || 'connect-mongodb setup ok');
    }
  )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.get('/api/polls', async (req, res) => {
  try {
      const polls = await Poll.find();
      res.json(polls);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch polls' });
  }
});

app.post('/api/polls', async (req, res) => {
  try {
    console.log(req.body);
      const { question, options } = req.body;
      const newPoll = new Poll({ question, options });
      await newPoll.save();
      res.json(newPoll);
  } catch (error) {
      res.status(400).json({ error: 'Failed to create a poll' });
  }
});

app.post('/api/polls/:id/vote', async (req, res) => {
  try {
      const pollId = req.params.id;
      const { optionId } = req.body;

      const poll = await Poll.findById(pollId);
      if (!poll) {
          res.status(404).json({ error: 'Poll not found' });
      } else if (optionId < 0 || optionId >= poll.options.length) {
          res.status(400).json({ error: 'Invalid option' });
      } else {
          poll.options[optionId].votes++;
          await poll.save();
          res.json(poll);
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to vote on the poll' });
  }
});
app.get('/announcements/after/:date', async (req, res) => {
  const { date } = req.params;
  console.log(date);
  console.log("made api req to after date");
  try {
    const announcements = await Announcements.find({ createdAt: { $gte: new Date(date) } });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching announcements' });
  }
});
// Socket.io
let users = [];
io.on('connection', socket => {
  console.log('User connected', socket.id);
  socket.on('addUser', userId => {
    const isUserExist = users.find(user => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit('getUsers', users);
    }
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
    const receiver = users.find(user => user.userId === receiverId);
    const sender = users.find(user => user.userId === senderId);
    const user = await User.findById(senderId);
    console.log('sender :>> ', sender, receiver);
    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      io.to(sender.socketId).emit('getMessage', {
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, name: user.name, email: user.email }
      });
    }
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
  // io.emit('getUsers', socket.userId);
});
app.get("/auth-success", (req, res) => {
  const jsonDataEncoded = req.query.data;
  const jsonData = JSON.parse(decodeURIComponent(jsonDataEncoded));
  console.log("Received JSON data:", jsonData);
  //if(datafrombackend.authstatus==1) {datafrombackend={...jsonData};}

  res.json(jsonData);
  // Now, you can use the jsonData object in your route logic

  // res.send("Data received successfully!");
});
// app.get("/get-auth-status",(req,res)=>{


// })
app.get("/api/maps", function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.get("/gett", function (req, res) {
  res.send("running!!!");
  //console.log(req);
});

app.get('/api/announcements', async (req, res) => {
  try {

    const query = {};
    const facts = await Announcements.find(query);
    //console.log(facts);
    // console.log("logging facts");
    res.json(facts);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'An error occurred while fetching facts.' });
  }
});

app.get('/api/announcements/lang', async (req, res) => {
  try {
    const originalString = req.query.announcement;
    console.log(originalString);
    const to = req.query.language;

    const translationResult = await translate(originalString, null, to);
    
    if (translationResult && translationResult.translation) {
      const translatedString = translationResult.translation;
      console.log(translatedString);
      res.json({ announcement: translatedString });
    } else {
      console.error('Translation result is not in the expected format:', translationResult);
      res.status(500).json({ error: 'Translation error' });
    }
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'An error occurred while fetching facts.' });
  }
});


app.post('/api/announcements', async (req, res) => {
  const { announcement, pincode } = req.body;
  const NewAnnouncement = new Announcements({
    announcement,
    pincode
  });
  await NewAnnouncement.save();
  const mailOptions = {
    from: 'webdevteam32023@gmail.com',
    subject: 'Announcement',
    text: announcement,
  };
  const query = {};
  //console.log("about to savecweweqw")
  const users = await User.find(query);
  // console.log(users);
  //  console.log("about to send");
  users.forEach((user) => {
    mailOptions.to = user.email;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error sending email to ${user.email}: ${error.message}`);
      } else {
        console.log(`Email sent to ${user.email}: ${info.response}`);
      }
    });
  });
})

app.post('/api/addMarker', async (req, res) => {
  const { description, latitude, longitude, radius, pincode, avatar } = req.body;
  const newMarker = new Markers({
    description,
    latitude,
    longitude,
    radius,
    pincode,
    avatar
  })
  //console.log("description ",descritpion);
  //console.log("in posting marker",req.body);

  await newMarker.save();
})
//router.post('/postimage',passport.checkAuthentication,usersController.update);
app.get('/api/getMarker', async (req, res) => {
  try {
    // console.log("received get marker request");
    const pincode = req.query.pincode;
    let query = { pincode };
    // console.log("the pincode is",pincode);
    if (!pincode || typeof pincode !== 'string') {
      return res.status(400).json({ error: 'Invalid pincode' });
    }

    const facts = await Markers.find(query);
    // console.log(facts);
    res.json(facts);
  } catch (error) {
    console.error('Error fetching facts:', error);

  }
});

app.get('/api/posts', async (req, res) => {
  try {

    const query = {};
    const posts = await Post.find(query);
    //console.log(facts);
    console.log("logging posts");
    res.json(posts);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'An error while fetching posts.' });
  }
});

//   const multer=require('multer');
//   let storage = multer.diskStorage({
//     destination: function (req,file,cb) {
//         cb(null,'../frontend/src/images');
//     },
//     filename: function (req,file,cb) {
//         //file.fieldname is avatar
//         cb(null,file.fieldname + '-' +Date.now());
//     }
// });
//const upload = multer({storage:storage});

app.post('/api/posts', async (req, res) => {

  console.log(req.body);
  const NewPost = new Post({
    "username": req.body.username,
    "content": req.body.content,
    "avatar": req.body.avatar,


  });
  await NewPost.save().then((savedDocument) => {
    console.log('Document saved successfully:', savedDocument);
  })
    .catch((error) => {
      console.error('Error saving document:', error);
    });
  ;
})
/*
app.post('/api/posts',async(req,res,next)=>{
  console.log("d",req.files,"d");
  const file=req.files;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
  })
})

*/

// app.post("/upload-image",upload.single("image"),async(req,res)=>{
//   res.send("uploaded");
// });






app.get('/data', (req, res) => {
  const data = { key: 'valueees' };
  res.json(data);
});

const createAdmin=async (req,res)=>{
  console.log("creating admin");
  try{
    
    const existingadminpincode=await User.findOne({pincode:req.body.pincode,isAdmin:true});
   
    if(existingadminpincode){
      return res.status(400).json({message:"an admin already exists for that pincode",field:"pincode"})
    }
    const existingadminemail = await User.findOne({ email: req.body.email });
    if(existingadminemail){
      return res.status(400).json({ message: "User with this email or pincode already exists",field:"email" });
    }
    if(req.body.password!=req.body.confirm_password){
      return res.status(400).json({ message: "Password and confirm_password do not match",field:"cnfpwd" });
    }
    const idString = `${req.body.pincode}_${req.body.user_name}`;
   // console.log(idString)
    const sha256Hash = crypto.createHash('sha256').update(idString).digest('hex');
    const shorterId = sha256Hash.substring(0, 10);
    const mailOptions = {
      from: 'webdevteam32023@gmail.com',
      subject: 'Reg ADMINID',
      text: `your adminID is ${shorterId}.It is required when u login as admin`,
    };
    mailOptions.to=req.body.email;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error sending email to ${req.body.email}: ${error.message}`);
      } else {
        console.log(`Email sent to ${req.body.email}: ${info.response}`);
      }
    });
    const newUser = new User({
      name: req.body.user_name,
      email: req.body.email,
      pincode: req.body.pincode,
      password: req.body.password,
      isAdmin:true,
      adminId:shorterId
    });
    console.log("User created");

    await newUser.save(); // Save the new user to the database

    console.log("User created");
    return res.status(201).json({ message: "User created successfully" });
  }
  catch (error) {
    console.error("Error in user creation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  
}

const create = async (req, res) => {
  console.log("HH");
  try {
    if (req.body.password !== req.body.confirm_password) {
  
      return res.status(400).json({ message: "Password and confirm_password do not match" });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      name: req.body.user_name,
      email: req.body.email,
      pincode: req.body.pincode,
      password: req.body.password,
    });
    console.log("User created");

    await newUser.save(); // Save the new user to the database

    console.log("User created");
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in user creation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*
createSession = async function (req, res) {
    try {
      // Step 1: Find the user
      const user = await User.findOne({ email: req.body.email });

//       // Handle user not found
//       if (!user) {
//         //return res.redirect('back');
//         console.log("invalid user");
//       }
  
//       // Step 2: Handle password check
//       if (user.password !== req.body.password) {
//         console.log("invalid user");
//         //return res.redirect('back');
//       }
  

      // Step 3: Handle session creation
      res.cookie('user_id', user.id);
    //   return res.redirect('/users/profile');
    console.log("heyy hiii");
    } catch (err) {
      console.log('Error in creating session:', err);
      return res.redirect('back');
    }
  };
  */
  app.get('/check-ifadmin',async(req,res)=>{
    console.log("check-ifID req received")
   
    const adminemail=req.query.adminemail;
    try{
      
      console.log("before finding admin with email ",adminemail);
      const user = await User.findOne({ email: adminemail });
      if(user.isAdmin==true){
        return res.status(400).json({message:'user is actually admin',field:'noAdminEmail'});
      }
      return res.status(200).json({ message: 'User is not an admin' });
    }
    catch(error){
      return res.status(500).json({ message: 'Error occurred while checking admin status' });
    }
  })
app.get('/check-adminID',async(req,res)=>{
  console.log("check-adminID req received")
  const adminIDToCheck = req.query.adminID;
  const adminemail=req.query.adminemail;
  try{
    
    console.log("before finding admin with email ",adminemail);
    const user = await User.findOne({ email: adminemail });
    if(user.isAdmin==false){
      return res.status(400).json({message:'No admin with such email',field:'noAdminEmail'});
    }
    if (!user) {
      return res.status(400).json({ message: 'User not found',field:'email' });
    }
   
    if (user.adminId == adminIDToCheck && user.isAdmin==true) {
      return res.status(200).json({ message: 'User is an admin' });
    } else {
      return res.status(400).json({ message: 'User is not an admin',field:'adminid' });
    }
  }
  catch(error){
    return res.status(500).json({ message: 'Error occurred while checking admin status' });
  }
})

app.post('/create-session', passport.authenticate(
  'local'
), usersController.createSession);

app.get('/destroy-session', usersController.destroySession);

app.post('/create_admin', async (req, res) => {
  try {
    console.log(req.body);
    await createAdmin(req, res);
  }
  catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})
app.post('/create', async (req, res) => {
  try {
    console.log(req.body); // Log the request body
    await create(req, res); // Call the create function to create the user
    //  res.status(200).json({ message: 'Data received and user created successfully' }); // Respond to the client
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*
  app.post('/create-session', async (req, res) => {
    try {
       
      await createSession(req, res); // Call the create function to create the user
      console.log("hey");
    //  res.status(200).json({ message: 'Data received and user created successfully' }); // Respond to the client
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

*/
app.post('/api/conversation', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversations({ members: [senderId, receiverId] });
    await newCoversation.save();
    res.status(200).send('Conversation created successfully');
  } catch (error) {
    console.log(error, 'Error')
  }
})

app.get('/api/conversations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({ members: { $in: [userId] } });
    const conversationUserData = Promise.all(conversations.map(async (conversation) => {
      const receiverId = conversation.members.find((member) => member !== userId);
      const user = await User.findById(receiverId);
      return { user: { receiverId: user._id, email: user.email, name: user.name }, conversationId: conversation._id }
    }))
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, 'Error')
  }
})

app.post('/api/message', async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = '' } = req.body;
    if (!senderId || !message) return res.status(400).send('Please fill all required fields')
    if (conversationId === 'new' && receiverId) {
      const newCoversation = new Conversations({ members: [senderId, receiverId] });
      await newCoversation.save();
      const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
      await newMessage.save();
      return res.status(200).send('Message sent successfully');
    } else if (!conversationId && !receiverId) {
      return res.status(400).send('Please fill all required fields')
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.log(error, 'Error')
  }
})

app.get('/api/message/:conversationId', async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      console.log(conversationId, 'conversationId')
      const messages = await Messages.find({ conversationId });
      const messageUserData = Promise.all(messages.map(async (message) => {
        const user = await User.findById(message.senderId);
        return { user: { id: user._id, email: user.email, name: user.name }, message: message.message }
      }));
      res.status(200).json(await messageUserData);
    }
    const conversationId = req.params.conversationId;
    if (conversationId === 'new') {
      const checkConversation = await Conversations.find({ members: { $all: [req.query.senderId, req.query.receiverId] } });
      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([])
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    console.log('Error', error)
  }
})

app.get('/api/users/:pincode', async (req, res) => {
  try {
    const userId = req.headers.userId;
    const pincode = req.params.pincode;
    // const users = await User.find({ _id: { $ne: userId } });
    const users = await User.find({ pincode: pincode });
    const usersData = await Promise.all(users.map(async (user) => {
      return { user: { email: user.email, name: user.name, receiverId: user._id, pincode: user.pincode } }
    }))
    res.status(200).json(await usersData);
  } catch (error) {
    console.log('Error', error)
  }
})

app.get("/signout", usersController.destroySession);

const fileupload = require('express-fileupload');
app.use(fileupload({
  useTempFiles: true
}));

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", error);
  }
  else {
    console.log("running!!");
  }
})