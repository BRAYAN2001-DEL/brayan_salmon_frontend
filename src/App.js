import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormList from './components/FormList';
import Form from './components/Form';
import EditForm from './components/EditForm';
import CreateForm from './components/CreateForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/form/:formId" element={<Form />} />
        <Route path="/edit-form/:formId" element={<EditForm />} />
        <Route path="/create-form" element={<CreateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
