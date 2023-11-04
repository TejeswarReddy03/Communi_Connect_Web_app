// PollForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [polls, setPolls] = useState([]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, text) => {
    const updatedOptions = [...options];
    updatedOptions[index] = text;
    setOptions(updatedOptions);
  };

  const submitPoll = () => {
    console.log("in submit polll");
    // Make an API request to create the poll
    const newPoll = {
      question,
      options,
    };

    axios.post('http://localhost:8004/api/polls', newPoll).then((response) => {
      setPolls([...polls, response.data]);
    });
  };

  return (
    <div>
      <h2>Create a New Poll</h2>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <h3>Options:</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>
      <button onClick={addOption}>Add Option</button> 
      </div>
      <div>
      <button onClick={submitPoll}>Submit Poll</button>
      </div>
    </div>
  );
}

export default PollForm;
