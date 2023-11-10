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
        const response = await axios.get('http://localhost:8004/api/posts', {});        
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
    {isformUploading?<h1>new post is being added</h1>:<ShowAnnouncements
        annData={posts}
        setShouldFetch={setShouldFetch}
        setisformUploading={setisformUploading}
        
      />}
      
    </>
  );
}

function NewAnnouncementForm({setShouldFetch,setisformUploading}) {
  const [user_name, setUsername] = useState('d');
  const [contents, setPost] = useState('d');
  const [image,setImage] = useState(null);
  const location = useLocation();
  const userState = location.state;
  const userData = userState ? userState.userData : null;
  console.log(userData);
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
         axios.post("http://localhost:8004/api/posts",{ username:user_name,content:contents,avatar:data.url.toString()
           
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
  <div className="mb-3">
    <label htmlFor="email" className="form-label">
      <strong>Username</strong>
    </label>
    <input
      type="text"
      
      placeholder="Enter Username"
      autoComplete="off"
      name="email"
      className="form-control rounded-100 w-64 py-2 px-2 border border-gray-300 rounded"
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="posts" className="form-label">
      <strong>Post</strong>
    </label>
    <textarea
      type="text"
      placeholder="Type something..."
      name="posts"
      rows="4"
      className="form-control rounded-10"
      onChange={(e) => setPost(e.target.value)}
    ></textarea>
  </div>

  <div className="mb-3">
    <label htmlFor="avatar" className="form-label">
      <strong>Upload Image</strong>
    </label>
    <input type="file" name="avatar" className="form-control ounded-100 w-64 py-2 px-2 border border-gray-300 rounded" onChange={onimginputchange} />
  </div>

  <button type="submit" className="btn btn-success btn-lg rounded-10">
    POST
  </button>
</form>

  );
}
function ShowAnnouncements({annData,setShouldFetch,setisformUploading}) {
  const announcementData = annData;
  const [contents, setPosts] = useState('d');
 
  const location = useLocation();
  const userState = location.state;
  const userData = userState ? userState.userData : null;
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
       axios.post("http://localhost:8004/api/comments", { content: contents, userr: userData.id,postid:postId })
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
      
      axios.post("http://localhost:8004/api/postslike", data,{headers:{"Content-Type" : "application/json"}})
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
      axios.post("http://localhost:8004/api/postslike", data,{headers:{"Content-Type" : "application/json"}})
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
       axios.post("http://localhost:8004/api/delete_post", {postid:postId }).
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
       axios.post("http://localhost:8004/api/delete_comment", {commentid:commentId }).then((res)=>{setisformUploading(false);});
    }
    catch(error){
      console.log("error",error);
    }
       }
      await posttoapii();


      // setisformUploading(true);
  } 




  return (
    <div className="bg-blue-200 text-black">
      <NewAnnouncementForm setShouldFetch={setShouldFetch} setisformUploading={setisformUploading} />
      
      <ul>
        {announcementData &&
          announcementData.map((x) => (
            <li key={x._id} className="announcement-item">
              <div className="announcement-image flex items-center justify-center">
             <strong>Posted By {x.username} </strong>
             </div>
  {x.avatar && (
    <div className="announcement-image flex items-center justify-center">
      <img src={x.avatar} alt="Avatar" className="img-fluid rounded border border-black border-2" width="600" height="100"/>
    </div>
  )}
  <div className="announcement-content">

     <br/>
     <div className="flex flex-col items-start ml-56">
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

  <div className="text-gray-700">
  (liked by {x.likes} members)
  <br/>
    {x.username} : {x.content}
  </div>

  <p className="text-gray-500 text-sm">
    Posted at {new Date(x.createdAt).toLocaleString()}
  </p>
</div>


    {userData.id == x.user && (
  // <button className="g-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md" >DELETE POST</button>
<>
<div className="flex justify-end mr-20 ">
  <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center" onClick={(e) => delete_post(e, x._id)}>
  <span class="mr-2">Delete Post</span>
  <svg class="w-4 h-4" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
</button>
</div>
</>
)}
  </div>
<div className="ml-56">
  <div>
  <form onSubmit={(e)=>{handleSubmit(e,x._id)}} className="my-4">
    
  <div className="mb-3">
    {/* <label htmlFor="posts" className="form-label">
      
    </label> */}
    <input
      type="text"
      placeholder="Type something..."
      name="comments"
      
      className="form-control rounded-100 w-64 py-2 px-2 border border-gray-300 rounded"
      onChange={(e) => setPosts(e.target.value)}
    />
  </div>
    <input type="hidden" name="post" value={x._id}  />
    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md">
    Comment
  </button>
  </form>
  </div>
  <strong>Comments</strong>

  {x.comments.map((comment) => (<>
            <p key={comment._id} className="mb-0">
              {comment.content } 
             
           
            {userData.id == comment.user && (
              <button
              onClick={(e) => delete_comment(e, comment._id)}
              
            >
              <img
                src={deletee} 
                alt="Delete"
                className="w-4 h-4 ml-1 mu-1"
              />
              
            </button>
            

)}
<hr class="w-1/2"/>
</p>

            </>
          ))
          }
          </div>


</li>

          ))}
      </ul>
    </div>
  );
}

export default Posts ;