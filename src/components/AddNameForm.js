import React from 'react';

export const AddNameForm = ({ label, onAddName }) => {

    const [name, setName] = React.useState('');
    const handleSubmit = (event) => {
      onAddName(name);
      setName('');
      event.preventDefault();
    }
    const handleChange = (event) => {
      setName(event.target.value);
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          {label}
          <input type="text" onChange={handleChange} value={name} />
        </label>
      </form>
    );
  }