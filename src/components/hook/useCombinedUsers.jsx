import { useState, useEffect } from 'react';
import axios from 'axios';

const useCombinedUsers = () => {
  const [combinedUsers, setCombinedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUser = (updatedUser) => {
    setCombinedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:3001/cards'),
          axios.get('http://localhost:3001/users'),
        ]);

        if (Array.isArray(cardsRes.data) && Array.isArray(usersRes.data)) {
          const combined = cardsRes.data
            .map((card) => {
              const user = usersRes.data.find((u) => u.id === card.id);
              if (!user) return null; 
              return { ...card, ...user };
            })
            .filter(Boolean); 

          setCombinedUsers(combined);
        } else {
          setError('데이터 형식이 잘못되었습니다.');
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
        setError('데이터 로딩에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { combinedUsers, loading, error, updateUser };
};

export default useCombinedUsers;
