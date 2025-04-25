import React from 'react';
import styled from 'styled-components';
import { ProfileCard } from 'profilecard'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  `;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0;
  max-width: 100%;
  box-sizing: border-box;
`;
const SearchInput = styled.input`
  width: 90%;
  border: 1px solid #ccc;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: none;
`;

const SearchButton = styled.button`
  flex : 1;
  border: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  &:hover {
    outline: none;
    border: 1px solid #ccc;
  }
`;


const UserList = () => {
  const users = [
    { name: 'test', age: 28, isOnline: 'online' },
    { name: 'mojio', age: 24, isOnline: 'offline' },
    { name: 'jisu', age: 21, isOnline: '' },
  ];

  return (
    <>
      <SearchBar>
        <SearchInput type='text' placeholder='검색' />
        <SearchButton>검색</SearchButton>
      </SearchBar>
      <Container>
        {users.map((user, index) => (
          <ProfileCard key={index}{...user} />
        ))}
      </Container>
    </>
  );
};

export default UserList
