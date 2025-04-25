import React, { use } from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/ProfileCard';
import SearchDiv from '../components/common/Search';
import useUsers from '../components/hooks/useUsers';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const UserList = () => {
  const {users} = useUsers();

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
