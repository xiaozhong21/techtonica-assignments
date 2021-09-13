import React, { useState, useEffect } from 'react'
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';

export default function Users() { 
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const getUsers = () => {
    return fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(res => setUsers(res));
  };

  useEffect(() => {
    getUsers();
  }, [id]);

  const addUser = newUser => {
    fetch("http://localhost:3000/users/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
  };

  const deleteUser = deleteId => {
    return fetch(`http://localhost:3000/users/${deleteId}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
       },
       body: null
    })
  };

  const handleAddUserForm = userFormSubmit => {
    userFormSubmit.preventDefault();
    const newUser = {
      id: id,
      name: name,
      email: email
    };
    addUser(newUser);
    getUsers();
    setId("");
    setName("");
    setEmail("");
    window.location.reload();
  }

  const handleDeleteUserForm = deleteIdSubmit => {
    deleteIdSubmit.preventDefault();
    deleteUser(deleteId);
    getUsers();
    setDeleteId("");
    window.location.reload();
  }

  const userList = users.map(user => 
    <li key={user.id}>
      User ID: {user.id}<br/>
      Name: {user.name}<br/>
      Email: {user.email}<br/><br/>
    </li>
  );

  return (
    <section className="user-management">
      <h2>User Management</h2>
      <div className="user-body">
        <div className="user-list">        
          <h3>All Users</h3>
          <ul id="users-list">
            {users && userList}
          </ul>
        </div>
        <div className="user-form">
          <AddUser 
            id={id}
            name={name} 
            email={email}
            setId={setId}
            setName={setName}
            setEmail={setEmail}
            handleAddUserForm={handleAddUserForm}
          />
          <DeleteUser 
            deleteId={deleteId} 
            setDeleteId={setDeleteId} 
            handleDeleteUserForm={handleDeleteUserForm}
          />
        </div>
      </div>
    </section>
  )
}
