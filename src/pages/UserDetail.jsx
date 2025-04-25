import React, { use } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate} from 'react-router-dom'
import useUsers from '../components/hook/useUsers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
`


const Btn = styled.button`
  background-color: #594c5a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  &:hover {
    background-color: #f377c3;
    color: white;
    transition: all 0.3s ease-in-out;
  }
`;

const Htitle = styled.h1`
  color: #4b0082;
`;


const Pfont = styled.p`
  font-size: 16px;
  color: #6a1b9a;
  font-weight: bold;
  `;

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, deleteUser } = useUsers();
  const user = getUser(Number(id));

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteUser(user.id);
      alert("삭제되었습니다.");
      navigate("/");
    }
  }

  return (
    <Container>
      <Htitle>{user.name}님의 상세 정보</Htitle>
      <Pfont>나이: {user.age}</Pfont>
      <Pfont>상태: {user.isOnline || "알수없음"} </Pfont>
      <div>
        <Btn onClick={()=> navigate('/')}>목록으로</Btn>
        <Btn onClick={handleDelete}>삭제하기</Btn>
      </div>
    </Container>
  )
}

export default UserDetail;
