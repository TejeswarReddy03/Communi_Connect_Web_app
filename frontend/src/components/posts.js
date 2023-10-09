import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isformUploading, setisformUploading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        console.log("isform",isformUploading);
        //console.log()
        setShouldFetch(true);
        const response = await axios.get('http://localhost:8004/api/posts', {});
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setShouldFetch(false);
      }
    }
    getPosts();
  }, [isformUploading]);

  useEffect(() => {
    if (shouldFetch == false) setisformUploading(shouldFetch);
  }, [shouldFetch]);

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

  async function handleSubmit(e) {
      e.preventDefault();
      const postdata=new FormData();
      //setisformUploading(true);

      postdata.append("username", user_name);
      postdata.append("content", contents);
      
  // console.log(user_name);
  console.log(postdata);
   
      async function posttoapi() {
        try {
           console.log("yes");
          const data=new FormData();
          data.append("file",image);
          data.append("upload_preset","cloggxrh");
          data.append("cloud_name","dxs9co3sw");
          console.log(data,"hi");
          fetch("https://api.cloudinary.com/v1_1/dxs9co3sw/image/upload",{
            method:"post",
            body:data
          }).then(res=>res.json())
          .then(data=>{
            setImage(data.url.toString());
           
            console.log("heyy image url is ",data.url.toString());
             axios.post("http://localhost:8004/api/posts",{ username:user_name,content:contents,avatar:data.url.toString()
           
          })
          .then(response=>{
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
        
        posttoapi();
        setisformUploading(true);
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
      className="form-control rounded-10"
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="posts" className="form-label">
      <strong>Post</strong>
    </label>
    <input
      type="text"
      placeholder="Type something..."
      name="posts"
      className="form-control rounded-10"
      onChange={(e) => setPost(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="avatar" className="form-label">
      <strong>Upload Image</strong>
    </label>
    <input type="file" name="avatar" className="form-control" onChange={onimginputchange} />
  </div>

  <button type="submit" className="btn btn-success btn-lg rounded-10">
    POST
  </button>
</form>

  );
}
function ShowAnnouncements(props) {
  const announcementData = props.annData;
  return (
    <div>
      <NewAnnouncementForm setShouldFetch={props.setShouldFetch} setisformUploading={props.setisformUploading} />

      <ul>
        {announcementData &&
          announcementData.map((x) => (
            <li key={x._id} className="announcement-item">
  <div className="announcement-content">
    <p className="mb-0">{x.content}</p>
    <p className="announcement-date">
      Created at {new Date(x.createdAt).toLocaleString()}
    </p>
  </div>
  {x.avatar && (
    <div className="announcement-image">
      <img src={x.avatar} alt="Avatar" className="img-fluid" width="300" height="200"/>
    </div>
  )}
</li>

          ))}
      </ul>
    </div>
  );
}

export default Posts;