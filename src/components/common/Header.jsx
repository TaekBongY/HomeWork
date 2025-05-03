// src/components/common/Header.jsx
import React from 'react';
import styled from 'styled-components';
// Link와 useNavigate를 함께 import 합니다.
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// --- Styled Components (기존과 동일하게 유지) ---
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  /* Link로 감쌌을 때 스타일 유지를 위해 추가 */
  a &, a:visited &, a:hover &, a:active & {
    color: white; /* 로고 색상 유지 */
    text-decoration: none; /* 밑줄 제거 */
  }
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

// 로그아웃 버튼을 위한 스타일 (Link 대신 button 사용)
const LogoutBtn = styled.button`
  color: white;
  text-decoration: none;
  font-weight: 500;
  background-color: #594c5a;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; /* 마우스 커서 변경 */
  font-size: inherit; /* 주변 폰트 크기 상속 */
  font-family: inherit; /* 폰트 상속 */

  &:hover {
    text-decoration: none;
    color: #f377c3;
    /* 필요하다면 호버 시 배경색 등 추가 스타일 */
  }
`;
// --- Styled Components 끝 ---


// PageHeader 함수를 하나로 합치고 수정합니다.
const PageHeader = () => {
  const { isLoggedIn, logout } = useUserContext(); // Context에서 상태와 함수 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로그아웃 처리 함수
  const handleLogout = () => {
    logout(); // Context의 logout 함수 실행
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Header>
      {/* 로고를 Link로 감싸 홈으로 이동하도록 합니다. */}
      <Link to={"/"} style={{ textDecoration: 'none' }}>
        <Logo>Router</Logo>
      </Link>
      <Nav>
        {/* isLoggedIn 값에 따라 로그인 또는 로그아웃 버튼을 보여줍니다. */}
        {isLoggedIn ? (
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        ) : (
          <NavBtn to={"/login"}>로그인</NavBtn>
        )}
        {/* 등록하기 버튼은 항상 보여줍니다. */}
        <NavBtn to={"/user/new"}>등록하기</NavBtn>
      </Nav>
    </Header>
  );
};

export default PageHeader;