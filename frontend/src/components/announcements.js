import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Announcements(props) {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isformUploading,setIsformUploading]=useState(false);
 
  useEffect(() => {
    async function getAnnouncements() {
      setIsLoading(true);
  
      try {
        const response = await axios.get('http://localhost:8004/api/announcements', {});
        setAnnouncements(response.data); // Update state with response data
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getAnnouncements();
  }, [isformUploading]);
  useEffect(()=>{
 if(isLoading==false) setIsformUploading(isLoading);
  },[isLoading])

  return (
    <div>
      {isLoading ? <LoadingPage /> : <ShowAnnouncements annData={announcements} setAnnouncements={setAnnouncements} setIsLoading={setIsLoading} setIsformUploading={setIsformUploading} />}
    </div>
  );
}

function NewAnnouncementForm({ setAnnouncements,setIsLoading,setIsformUploading}) {
  const [text, setText] = useState('');
 
  
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function generateRandomId() {
    return Math.round(Math.random() * 10000000);
  }

  function createNewAnnouncement() {
    return {

      announcement:text,
      pincode:456
      

    };
  }

   function handleSubmit(e) {
    e.preventDefault();

    if (text &&  textLength <= 200) {
      setIsLoading(true);
      
      const NewAnnouncement = createNewAnnouncement();

     async function posttoapi() {

        await axios.post("http://localhost:8004/api/announcements", { announcement: text, pincode: 456 });
      }
      posttoapi();
     setIsformUploading(true);
      setText('');
     
     

      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Share an announcement with the community...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      
     
      <button  disabled={isUploading}>
        Post
      </button>
    </form>
  );
}
function ShowAnnouncements(props) {
  const announcementData = props.annData;
  return (
    <div>
    <NewAnnouncementForm setAnnouncements={props.setAnnouncements} setIsLoading={props.setIsLoading} setIsformUploading={props.setIsformUploading} />
    <ul>
      {announcementData.map((x) => (
        <li key={x._id}>
          {x.announcement} - Created at {new Date(x.createdAt).toLocaleString()}
        </li>
      ))}
    </ul>
    </div>
  );
}

function LoadingPage() {
  return <h1>Page is loading</h1>;
}

export default Announcements;
