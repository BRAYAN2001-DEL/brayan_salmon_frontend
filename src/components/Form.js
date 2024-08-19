import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function Form({ formId }) {
  const [formDetails, setFormDetails] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/api/forms/${formId}`)
      .then(response => setFormDetails(response.data))
      .catch(error => console.error('Error fetching form details:', error));
  }, [formId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/forms/${formId}`, formData)
      .then(response => alert('Form submitted successfully!'))
      .catch(error => console.error('Error submitting form:', error));
  };

  if (!formDetails) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formDetails.name}</h2>
      {formDetails.inputs.map(input => (
        <div key={input.id}>
          <label>
            {input.name}
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name] || ''}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
