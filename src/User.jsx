import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function User() {
  const [users, setUsers] =  useState([]);

  const getUsers = async () => {
   
      const { data } = await axios.get(`${import.meta.env.VITE_BURL}/users`);
      setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
   
      const response = await axios.delete(`${import.meta.env.VITE_BURL}/users/${id}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully!');
      }
    
  };


  return (
    <div className="container">
      <Link to={'/form'} className="btn btn-primary w-25 mb-2">
        Create
      </Link>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Name: {user.userName}</h5>
                <p className="card-text">Email: {user.email}</p>
                <div className="d-flex gap-2">
                  <Link to={`/update/${user.id}`} className="btn btn-secondary">
                    Edit 
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger">
                    Delete 
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
