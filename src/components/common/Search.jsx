import React from 'react'
import styled from 'styled-components'
import { useNavigate} from 'react-router-dom'

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0;
  max-width: 100%;
  box-sizing: border-box;
`;
const SearchInput = styled.input`
  width: 89%;
  border: 1px solid #ccc;
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  outline: none;
  padding-left: 10px;
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


const SearchDiv = () => {
  const navigate = useNavigate();
  return (
    <SearchBar>
      <SearchInput type='text' placeholder='검색' />
      <SearchButton onClick={()=> navigate('/*')}>검색</SearchButton>
    </SearchBar>
  )
}

export default SearchDiv
