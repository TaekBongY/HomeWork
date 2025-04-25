import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
`;

const NavBtn = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  background-color: #594c5a;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;

  &:hover {
    text-decoration: none;
    color: #f377c3;
  }
`;



const PageHeader = () => {
  return (
    <Header>
      <Logo>Router</Logo>
        <Nav>
            <NavBtn to={'*'}>로그인</NavBtn>
            <NavBtn to={"/user/new"}>회원가입</NavBtn>
        </Nav>
    </Header>
  )
}

export default PageHeader
