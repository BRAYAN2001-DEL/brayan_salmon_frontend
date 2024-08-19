import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/forms`)
      .then(response => setForms(response.data))
      .catch(error => console.error('Error fetching forms:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/api/forms/${id}`)
      .then(() => setForms(forms.filter(form => form.id !== id)))
      .catch(error => console.error('Error deleting form:', error));
  };

  return (
    <div>
      <h1>Available Forms</h1>
      <Link to="/create-form"><button>Create New Form</button></Link>
      {forms.map(form => (
        <div key={form.id}>
          <h2>{form.name}</h2>
          <Link to={`/form/${form.id}`}><button>Fill Form</button></Link>
          <Link to={`/edit-form/${form.id}`}><button>Edit Form</button></Link>
          <button onClick={() => handleDelete(form.id)}>Delete Form</button>
        </div>
      ))}
    </div>
  );
}

export default FormList;
