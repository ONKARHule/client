import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [jsonData, setJsonData] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const apiCall = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      axios.post('https://bajaj-finserv-task-21-bce-3363.vercel.app/', {
        data: parsedData.data,
        user_id: userId,
        email: email,
        roll_number: rollNumber
      }).then((response) => {
          setResponseData(response.data);
        }).catch((error) => {
          console.error('Error in API call:', error);
        });
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const handleSelectionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = responseData.alphabets;
    if (selectedOptions.includes('Numbers')) filteredData.numbers = responseData.numbers;
    if (selectedOptions.includes('Highest lowercase alphabet')) filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;

    return (
      <div className="response-container">
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Onkar Anil Hule</h2>
        <p>Roll Number: 21BCE3363</p>
        <input 
          type="text" 
          placeholder="User ID (e.g., john_doe_17091999)" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Roll Number" 
          value={rollNumber} 
          onChange={(e) => setRollNumber(e.target.value)} 
        />
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON here...'
        />
        <button onClick={apiCall}>Make API Call</button>
        <br />
        <select multiple onChange={handleSelectionChange}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
        {renderResponse()}
        <br />
        <button onClick={() => window.location.href = 'https://github.com/your-repository-link'} className="repo-button">
          Go to My Repository
        </button>
      </header>
    </div>
  );
}
