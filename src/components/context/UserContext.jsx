import React, { createContext, useState } from 'react';

export const UsersContext = createContext();

const initUsers = [
  { id: 1, name: 'mojio', age: 28, isOnline: 'online' },
  { id: 2, name: 'saki', age: 27, isOnline: 'offline' },
  { id: 3, name: 'erie', age: 23, isOnline: '' },
];

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(initUsers);

  const getUser = (id) => users.find(user => user.id === id);

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addUser = (user) => {
    setUsers(prev => [...prev, user]);
  };

  return (
    <UsersContext.Provider value={{ users, setUsers, getUser, deleteUser, addUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
