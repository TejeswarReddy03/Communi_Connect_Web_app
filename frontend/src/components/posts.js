import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts(){
    const [posts, setPosts] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
      
        async function getPosts() {
          try {
            const response = await axios.get('http://localhost:8004/api/posts', {});
            console.log(response.data);
            setPosts(response.data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        
        
        
    }
    getPosts();
        
      },[]);

    return(
<>
<ShowAnnouncements annData={posts} setShouldFetch={setShouldFetch} />
</>  
)
}

function NewAnnouncementForm({setShouldFetch}) {
    const [user_name, setUsername] = useState('');
    const [contents, setPost] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
         // const NewAnnouncement = createNewAnnouncement();
         async function posttoapi() {
          //  console.log("New post created:");
           // setAnnouncements((prevPosts) => [response.data, ...prevPosts]);
             await axios.post("http://localhost:8004/api/posts", { username: user_name, content: contents });
            
            setShouldFetch(true);
          }
          posttoapi();
         
      } 

    return (
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="email" >
        <strong>UserName</strong>
    </label>
    <input
        type="text"
        placeholder="Enter UserName"
        autoComplete="off"
        name="email"
        className="form-control rounded-10"
        
        onChange={(e) => setUsername(e.target.value)}
    />
    </div>  
    
    <div className="mb-3">
        <label htmlFor="posts">
            <strong>POST</strong>
        </label>
        <input
            type="text"
            placeholder="Type something..."
            name = "posts"
            className="form-control rounded-10"
            onChange={(e) => setPost(e.target.value)}
        />
    </div>
    <button type="submit" className="btn btn-success w-100 rounded-10">
        POST
    </button>
</form>
    );
  }
function ShowAnnouncements(props) {
    const announcementData = props.annData;

    console.log(announcementData);
    return (
      <div>
      <NewAnnouncementForm setShouldFetch={props.setShouldFetch} />
     
      <ul>

        {announcementData && announcementData.map((x) => (
          <li key={x._id}>
            {x.content} - Created at {new Date(x.createdAt).toLocaleString()}
          </li>
          
        ))}
      </ul>
      </div>
    );
  }
export default Posts;
