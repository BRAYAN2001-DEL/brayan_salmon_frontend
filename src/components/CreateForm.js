import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function CreateForm() {
  const [formName, setFormName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/forms`, { name: formName })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error creating form:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Form</h2>
      <label>
        Form Name
        <input
          type="text"
          value={formName}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Form</button>
    </form>
  );
}

export default CreateForm;

