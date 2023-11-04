import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollForm from './PollForm'; // Assuming you have PollForm component in a separate file

function Poll() {
   
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [polls, setPolls] = useState([]);
  const [showAddPollForm, setShowAddPollForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8004/api/polls').then((response) => {
      setPolls(response.data);
    });
  }, []);

  const handleCreatePoll = () => {
    axios.post('http://localhost:8004/api/polls', { question, options }).then((response) => {
      setPolls([...polls, response.data]);
      setQuestion(''); // Clear the question input
      setOptions([]);  // Clear the options array
    });
  };

  const handleVote = (pollId, optionId) => {
    axios.post(`http://localhost:8004/api/polls/${pollId}/vote`, { optionId }).then((response) => {
      const updatedPolls = polls.map((p) => (p._id === pollId ? response.data : p));
      setPolls(updatedPolls);
    });
  };

  const handleAddPollClick = () => {
    setShowAddPollForm(true);
  };
  console.log("in the poll component")
  return (
    <div className="poll-container" style={{ background: 'black', padding: '20px' }}>
      <h2>Polls</h2>
      <button onClick={handleAddPollClick}>Add Poll</button>
      {showAddPollForm && <PollForm />}

      {/* <input
        type="text"
        placeholder="Poll Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      /> */}
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const updatedOptions = [...options];
              updatedOptions[index] = e.target.value;
              setOptions(updatedOptions);
            }}
          />
        </div>
      ))}
      {/* <button onClick={handleCreatePoll}>Create Poll</button> */}

      <div>
        {polls.map((poll) => (
          <div key={poll._id}>
            <h3>{poll.question}</h3>
            {poll.options.map((option, index) => (
              <div key={index}>
                {option.text}
                <button onClick={() => handleVote(poll._id, index)}>Vote</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poll;
