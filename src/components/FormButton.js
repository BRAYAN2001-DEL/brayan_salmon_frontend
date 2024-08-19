// src/components/FormButton.js
import React from 'react';

function FormButton({ form, onClick }) {
  return (
    <button onClick={() => onClick(form.id)}>
      {form.name}
    </button>
  );
}

export default FormButton;
