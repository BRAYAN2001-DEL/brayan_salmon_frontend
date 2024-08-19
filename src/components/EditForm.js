import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function EditForm() {
  const { formId } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [formName, setFormName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/forms/${formId}`)
      .then(response => {
        setFormDetails(response.data);
        setFormName(response.data.name);
      })
      .catch(error => console.error('Error fetching form details:', error));
  }, [formId]);

  const handleChange = (e) => {
    setFormName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${BASE_URL}/api/forms/${formId}`, { name: formName })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error updating form:', error));
  };

  if (!formDetails) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Form</h2>
      <label>
        Form Name
        <input
          type="text"
          value={formName}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditForm;
