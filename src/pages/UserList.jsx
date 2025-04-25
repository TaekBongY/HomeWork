import React, { use } from 'react';
import styled from 'styled-components';
import ProfileCard from '../components/Card/ProfileCard';
import SearchDiv from '../components/common/Search';
import useUsers from '../components/hook/useUsers';

const Container = styled.div`
  display: flex;
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
