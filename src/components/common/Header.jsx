import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { FaHome } from "react-icons/fa";
import ThemeToggle from './ThemeMode/ThemeToggle';
import Search from './Search';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
  border-top-right-radius:10px;
  border-top-left-radius:10px;
  margin-top:10px;
`;

const Logo = styled(FaHome)`
  color: white;
  width: 30px;
  height: 30px;
`;


const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
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
    color: #f377c3;
  }
`;

const PageHeader = ({ isDarkMode, toggleTheme }) => {
  const { loggedInUser, logout } = useUserContext();



  const handleLogout = () => {
    logout();
    location.href=("/");
  };

  return (
    <Header>
      <Link to={"/"} style={{ textDecoration: 'none' }}>
        <Logo />
      </Link>
      <Search/>
      <Nav>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        {loggedInUser ? (<>
          <NavBtn to={"/mypage"}>내정보</NavBtn>
          <NavBtn to={"/edit/new"}>글쓰기</NavBtn></>
) : (
  <NavBtn to={"/login"}>로그인</NavBtn>
)}
        {loggedInUser ? (
  <NavBtn onClick={handleLogout}>로그아웃</NavBtn>
) : (
  <NavBtn to={"/user/new"}>회원가입</NavBtn>
)}
        
      </Nav>
    </Header>
  );
};

export default PageHeader;