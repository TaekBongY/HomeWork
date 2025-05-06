import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsersData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(console.error);
  }, []);

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
    await fetch(`http://localhost:3001/cards/${id}`, {
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
  const addCard = async (cards) => {
    const res = await fetch('http://localhost:3001/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cards),
    });
    const newCard = await res.json();
    setCards(prev => [...prev, newCard]);
    return newCard; 
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
  const updateCard = async (DataId, updatedData) => {
    try {
      const resGet = await fetch('http://localhost:3001/cards');
      const allCards = await resGet.json();
      const targetCard = allCards.find(card => card.DataId === DataId);
      if (!targetCard) {
        throw new Error("해당 카드(DataId)를 찾을 수 없습니다.");
      }
  
      const res = await fetch(`http://localhost:3001/cards/${targetCard.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
  
      const updatedCard = await res.json();
      setCards(prev => prev.map(card =>
        card.DataId === DataId ? updatedCard : card
      ));
      return updatedCard;
    } catch (err) {
      console.error('updateCard 오류:', err);
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
        updateUser,
        addCard,
        cards,
        updateCard
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersContext);

export default UsersProvider;
