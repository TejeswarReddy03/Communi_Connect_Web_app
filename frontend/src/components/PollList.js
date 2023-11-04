// PollList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch polls when the component mounts
    axios.get('http://localhost:8004/api/polls').then((response) => {
      setPolls(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Polls</h2>
      {polls.map((poll) => (
        <div key={poll._id}>
          <h3>{poll.question}</h3>
          <ul>
            {poll.options.map((option, index) => (
              <li key={index}>{option.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PollList;
