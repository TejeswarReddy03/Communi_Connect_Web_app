import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Await, useLocation } from 'react-router-dom';
import './posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deletee from './delete.png'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isformUploading, setisformUploading] = useState(false);
  // const [likes,setLikes] = useState('d');

  useEffect(() => {
    async function getPosts() {
      try {
        console.log("isform",isformUploading);
        setShouldFetch(true);
        const response = await axios.get('https://communiconnect-backend.onrender.com/api/posts');        
        setPosts(response.data);
      } 
      catch (error) {
        console.error('Error fetching posts:', error);
      } 
      finally {
        setShouldFetch(false);
      }
    }
    getPosts();
  }, [isformUploading]);

  // useEffect(() => {
  //   if (shouldFetch == false) setisformUploading(shouldFetch);
  // }, [shouldFetch]);

  return (
    <>
    {
    isformUploading?<h1>new post is being added</h1>:<ShowAnnouncements
        annData={posts}
        setShouldFetch={setShouldFetch}
        setisformUploading={setisformUploading}
        
      />
  }
    </>
  );
}

function NewAnnouncementForm({setShouldFetch,setisformUploading}) {
  const [user_name, setUsername] = useState('d');
  const [contents, setPost] = useState('d');
  const [image,setImage] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  // const location = useLocation();
  // const userState = location.state;
  // const userData = userState ? userState.userData : null;
  const userData = JSON.parse(localStorage.getItem('userDataa'));
// console.log(userData)
  // console.log("userData");
  //const userData = JSON.parse(localStorage.getItem('userData'));

  async function handleSubmit(e) {
      e.preventDefault();
      const postdata=new FormData();
      setisformUploading(true);
console.log("in handle submit")
      postdata.append("username", user_name);
      postdata.append("content", contents);
   
      async function posttoapi() {
        try {
          setisformUploading(true);
           console.log("yes");
           setisformUploading(true);
          const data=new FormData();
          data.append("file",image);
          data.append("upload_preset","cloggxrh");
          data.append("cloud_name","dxs9co3sw");
          console.log(data,"hi");
          fetch("https://api.cloudinary.com/v1_1/dxs9co3sw/image/upload",{
            method:"post",
            body:data
          })
          .then(res=>res.json())
          .then(data=>{
            setImage(data.url.toString());
           

            console.log("heyy image url is ",data.url.toString());
         axios.post("https://communiconnect-backend.onrender.com/api/posts",{ username:user_name,content:contents,avatar:data.url.toString(),userid:userData.id
           
          })
          .then(response=>{
            console.log("in the then of posttoapi")
           // setisformUploading(true);
            setisformUploading(false);

          })
          ;
         
          })
          
          .catch((error)=>{
            console.log(error);
            
          })
   
        
        } catch (error) {
          console.error("Error:", error.response.data);
        }
      }
        

        await posttoapi();
        
        // setShouldFetch(true);


    } 

  function onimginputchange(e){
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    

  };
  return (
<form onSubmit={handleSubmit} className="my-4">
<div className="mb-4">
        <label htmlFor="anonymous" className="flex items-center text-sm font-semibold text-gray-600">
          <input
            type="checkbox"
            id="anonymous"
            className="hidden"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          <div className="relative w-8 h-4 border border-gray-300 rounded-md transition duration-300 bg-gray-300 hover:border-blue-500">
            <div
              className={`absolute w-4 h-4 transition-transform transform ${
                isAnonymous ? 'translate-x-4 bg-blue-500' : 'bg-white'
              } rounded-md`}
            ></div>
          </div>
          <span className="ml-2">Post Anonymously</span>
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="posts" className="block text-sm font-semibold text-gray-600">
          <strong>Post</strong>
        </label>
        <textarea
          placeholder="Type something..."
          name="posts"
          rows="4"
          className="block w-64 py-2 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-300 hover:border-blue-500 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="avatar" className="block text-sm font-semibold text-gray-600">
          <strong>Upload Image (Mandatory)</strong>
        </label>
        <input
          type="file"
          name="avatar"
          className="block w-64 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 hover:border-blue-500 transition duration-300"
          onChange={onimginputchange}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
        onClick={() => setUsername(isAnonymous ? 'Anonymous User' : userData.name)}
      >
        POST
      </button>

</form>

  );
}
function ShowAnnouncements({annData,setShouldFetch,setisformUploading}) {
  const announcementData = annData;
  const [contents, setPosts] = useState('d');
 
  // const location = useLocation();
  // const userState = location.state;
  // const userData = userState ? userState.userData : null;
  const userData = JSON.parse(localStorage.getItem('userDataa'));
  // console.log(userData.id);
// console.log(userData);
  //  console.log("annData",announcementData);
  
// console.log(commentsData);

  async function handleSubmit(e,postId) {
    setisformUploading(true);
    e.preventDefault();
   // const postdata=new FormData();
  //  console.log("hiii",postId);
   // setisformUploading(true);
  
    async function posttoapii() {
     // setisformUploading(true);
      try{
       axios.post("https://communiconnect-backend.onrender.com/api/comments", { content: contents, userr: userData.id,postid:postId })
      .then((response)=>{
        setisformUploading(false);
      });
    }
    catch(error){
      console.log("error",error);
    }
       }
     await  posttoapii();

    //postdata.append("comment", contents);
    
// console.log(user_name);
//console.log(contents);
 

      // setisformUploading(true);
  } 
  //const [liked, setLiked] = useState(post.likedBy.includes(user.id));
  async function handleLike(e,post) {
    // setLikes('s');

   e.preventDefault();
   async function posttoapii() {
    setisformUploading(true);
     try{
    if (post.likedBy.includes(userData.id)) {
      let data = JSON.stringify({
        postId: post._id, userId: userData.id
      });
      
      axios.post("https://communiconnect-backend.onrender.com/api/postslike", data,{headers:{"Content-Type" : "application/json"}})
        .then(response => {
          console.log("in likes")
          setisformUploading(false);
        })
        .catch(error => {
          console.error('Error unliking post:', error);
        });
    } else {
      let data = JSON.stringify({
        postId: post._id, userId: userData.id
       
      });
     // console.log(userData.id);
      axios.post("https://communiconnect-backend.onrender.com/api/postslike", data,{headers:{"Content-Type" : "application/json"}})
        .then(response => {
          console.log("in likes")

          
          setisformUploading(false);
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    }
  }
  catch (error) {
    console.error("Error:", error.response.data);
  }
}
  await posttoapii();
  };


  async function delete_post(e,postId) {
    e.preventDefault();
  setisformUploading(true);
  async function posttoapii() {
      try{
       axios.post("https://communiconnect-backend.onrender.com/api/delete_post", {postid:postId }).
       then((res)=>{setisformUploading(false);})
      
      ;
    }
    catch(error){
      console.log("error",error);
    }
       }
     await  posttoapii();


      // setisformUploading(true);
  } 
  async function delete_comment(e,commentId) {
    e.preventDefault();
    console.log(commentId);
    setisformUploading(true);
  async function posttoapii() {
      try{
       axios.post("https://communiconnect-backend.onrender.com/api/delete_comment", {commentid:commentId }).then((res)=>{setisformUploading(false);});
    }
    catch(error){
      console.log("error",error);
    }
       }
      await posttoapii();


      // setisformUploading(true);
  } 




  return (
<div className="bg-blue-200 text-black p-8 p-8 min-h-screen">
  <NewAnnouncementForm setShouldFetch={setShouldFetch} setisformUploading={setisformUploading} />

  <ul className="space-y-8">
    {announcementData &&
      announcementData.map((x, index) => (
        <li
          key={x._id}
          className={`announcement-item p-4 rounded-md ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-4">
            <strong>Posted By {x.username}</strong>
          </div>

          {x.avatar && (
            <div className="announcement-image flex items-center justify-center mt-4">
              <img
                src={x.avatar}
                alt="Avatar"
                className="rounded border border-black border-2 w-auto h-auto"
                style={{ maxWidth: '405px', maxHeight: '500px', borderRadius: '10px' }}
              />
            </div>
          )}

          <div className="announcement-content mt-4">
            <div className="flex flex-col items-start">
              <button
                onClick={(e) => handleLike(e, x)}
                className={`py-2 px-4 rounded-md shadow-md ${
                  x.likedBy.includes(userData.id)
                    ? 'bg-blue-500 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600'
                } font-semibold`}
              >
                {x.likedBy.includes(userData.id) ? 'Unlike' : 'Like'}
              </button>

              <div className="text-gray-700 mt-2">
                (liked by {x.likes} members)
                <br />
                {x.username} : {x.content}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Posted at {new Date(x.createdAt).toLocaleString()}
              </p>
            </div>

            {(userData.id == x.user || userData.isAdmin) && (
              <>
                <div className="flex justify-end mt-4">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center" onClick={(e) => delete_post(e, x._id)}>
                    <span className="mr-2">Delete Post</span>
                    <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            <form onSubmit={(e) => { handleSubmit(e, x._id) }} className="my-4">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Type something..."
                  name="comments"
                  className="form-control rounded-100 w-full sm:w-64 py-2 px-3 border border-gray-300 rounded"
                  onChange={(e) => setPosts(e.target.value)}
                />
              </div>

              <input type="hidden" name="post" value={x._id} />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
                Comment
              </button>
            </form>

            <strong className="mt-4 block">Comments</strong>

            {x.comments.map((comment) => (
              <div key={comment._id} className="mb-4">
                <p className="mb-0">
                  {comment.content}

                  {userData.id == comment.user && (
                    <button onClick={(e) => delete_comment(e, comment._id)}>
                      <img
                        src={deletee}
                        alt="Delete"
                        className="w-4 h-4 ml-1 mu-1"
                      />
                    </button>
                  )}
                </p>
                <hr className="w-1/2 mt-2" />
              </div>
            ))}
          </div>
        </li>
      ))}
  </ul>
</div>

  );
}

export default Posts;