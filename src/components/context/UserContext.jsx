import React, { createContext, useState, useContext, useEffect } from 'react';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsersData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  // users -> 데이터, 
  useEffect(() => {
    // 앱 시작 시 로컬 스토리지에서 사용자 정보 확인
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
    // 사용자 목록 데이터 fetch
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsersData(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedInUser(userData); // 로그인된 사용자 상태 업데이트
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null); // 로그인된 사용자 상태 null로 업데이트
  };


  // 2. 특정 유저 가져오기
  const getUser = (id) => users.find(user => user.id === id);

  // 3. 유저 삭제 (JSON 서버 반영하려면 fetch DELETE도 추가해야 함)
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    });
    setUsersData(prev => prev.filter(user => user.id !== id));
  };

  // 4. 유저 추가 (JSON 서버 반영하려면 fetch POST도 추가해야 함)
  const addUser = async (user) => {
    const res = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    setUsersData(prev => [...prev, newUser]);
    return newUser; // ✅ 추가된 사용자 반환
  };

  const updateUser = async (id, formData) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id, // 반드시 포함
          ...formData, // title, detail, image 포함되어 있어야 함
          
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
        users: users, // 기존 users는 사용자 목록으로 사용
        loggedInUser, // 로그인된 사용자 정보
        login,
        logout,
        setUsers: setUsersData, // 이름 명확화
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
