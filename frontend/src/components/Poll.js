import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Poll() {
  const [googleFormURL, setGoogleFormURL] = useState('');
  const [googleurluser,setGoogleurluser]=useState('');
  const [noformmsg,setNoformmsg]=useState('');

  const userdata = JSON.parse(localStorage.getItem('userDataa'));

  const userIsAdmin = userdata.isAdmin;
  const handleURLChange = (e) => {
    setGoogleFormURL(e.target.value);
  };

  const handleSubmit = () => {
    // Make an Axios POST request to save the Google Form URL to the database
    axios
      .post('http://localhost:8004/api/save-google-form', {
        formLink: googleFormURL,
        pincode:userdata.pincode
      })
      .then((response) => {
        // Handle the response if needed
        console.log('Google Form URL saved:', response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error('Error saving Google Form URL:', error);
      });
  };
  const fetchRecentOpenPoll = async () => {
    try {
      const response = await axios.get(`http://localhost:8004/api/fetch-recent-open-poll/${userdata.pincode}`);
      const recentPoll = response.data;
console.log(recentPoll);
      if (recentPoll) {
        setGoogleurluser(recentPoll.formLink);
      } else {
        console.log('No recent open poll found for the user.');
        
        setNoformmsg('No polls currently in your pincode area');
      }
    } catch (error) {
      console.error('Error fetching the recent open poll:', error);
    }
  };

  useEffect(() => {
    if (!userIsAdmin) {
      //console.log("fething")
      fetchRecentOpenPoll();
    }
  }, []);
  console.log("user google url",googleurluser);
  return (
    <div>
      {userIsAdmin ? (
        <div>
          <h1 style={{textTransform: 'uppercase', fontWeight: 'bold',fontSize:'20px',marginTop:'20px'}}>As an Admin,you can send forms.Click submit to send the forms</h1>
          <input
          style={{color:'white',margin:'10px',minHeight:'50px',minWidth:'600px',borderRadius:'10px',marginLeft:'10%',marginTop:'30px',marginBottom:'30px'}}
            type="text"
            placeholder="Enter Google Form URL"
            value={googleFormURL}
            onChange={handleURLChange}
          />
          <button
  onClick={handleSubmit}
  style={{
    backgroundColor: '#A9A9A9',
    color: 'black', // Text color when not hovered
    transition: 'background-color 0.3s, box-shadow 0.3s', // Transition effect
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow when not hovered
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#555'; // Change background color on hover
    e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; // Add glow on hover
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#A9A9A9'; // Restore background color
    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Restore box shadow
  }}
>
  Submit
</button>

          <iframe
            title="Google Form Poll"
            src={googleFormURL}
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Loading...
          </iframe>
        </div>
      ) : (
        <div>
          {googleurluser ? (
            <iframe
              title="Google Form Poll"
              src={googleurluser}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading...
            </iframe>
          ) : (
            <p>No recent polls conducted in your pincode area</p>
          )}
        </div>
      )}
    </div>
  );
  
}

export default Poll;
