import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import SearchDiv from '../components/common/Search';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  `;

const UserList = () => {
  const users = [
    { id: 1, name: 'mojio', age: 28, isOnline: 'online' },
    { id: 2,name: 'saki', age: 27, isOnline: 'offline' },
    { id: 3,name: 'erie', age: 23, isOnline: '' },
  ];

  return (
    <>
      <SearchDiv />
      <Container>
        {users.map((user, index) => (
          <ProfileCard key={index}{...user} />
        ))}
      </Container>
    </>
  );
};

export default UserList
