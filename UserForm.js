import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ toggleForm, editingUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        company: editingUser.company.name
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Edit an existing user
        await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, formData);
      } else {
        // Add a new user
        await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      }
      toggleForm();
    } catch (err) {
      setError('Failed to submit user');
    }
  };

  return (
    <div className="user-form-container">
      <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter Company"
          required
        />
        <button type="submit" className="submit-button">
          {editingUser ? 'Save Changes' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
