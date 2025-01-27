import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css'

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // For editing

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  // Pass the editingUser as a prop to the form for editing purposes
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null); // Reset the editing user after closing the form
  };

  return (
    <div className="app-container">
      <h1>User Management Dashboard</h1>
      <ErrorBoundary>
        <button className="add-button" onClick={toggleForm}>
          {isFormOpen ? 'Close Form' : 'Add User'}
        </button>

        {isFormOpen && (
          <UserForm
            toggleForm={handleCloseForm}
            editingUser={editingUser} // Pass the user to edit
          />
        )}
        <UserList handleEditUser={handleEditUser} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
