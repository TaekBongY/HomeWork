import React, { use } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'



const ErrorImg = styled.img`
  width: 10%;
  height: auto;
  `;

const ErrorBtn = styled.button`
  background-color: #594c5a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #f377c3;
    color: white;
    transition: all 0.3s ease-in-out;
  }
`;


const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <h1>404 Not Found</h1>
      <ErrorImg src="/error.gif" alt="error"/>
    </div>
    <div>
      <ErrorBtn onClick={()=> navigate('/')}>메인 페이지로</ErrorBtn>
    </div>
    </>
  )
}

export default Error404
