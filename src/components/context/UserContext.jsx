import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsersData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsersData(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedInUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };



  const getUser = (id) => users.find(user => user.id === id);


  const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    });
    setUsersData(prev => prev.filter(user => user.id !== id));
  };


  const addUser = async (user) => {
    const res = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    setUsersData(prev => [...prev, newUser]);
    return newUser; 
  };

  const updateUser = async (id, formData) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, 
          ...formData, 
          
        }),
        
      });
  
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
  
      return await res.json();
    } catch (err) {
      console.error('updateUser 오류:', err);
      return null;
    }
  };
  return (
    <UsersContext.Provider value={{
        users: users, 
        loggedInUser, 
        login,
        logout,
        setUsers: setUsersData,
        getUser,
        deleteUser,
        addUser,
        updateUser
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersContext);

export default UsersProvider;
