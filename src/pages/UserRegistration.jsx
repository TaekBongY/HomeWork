import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useUsers from '../components/hook/useUsers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
const FormData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  gap: 10px;
  width: 300px;
  padding: 20px;
`
const DataText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const DataStatus = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;


const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const { addUser, users } = useUsers();

  const isUsernameDuplicate = (name) => {
    return users.some(user => user.name === name);
  }

  const isValidAge = (age) => {
    return age >= 18 && age <= 100;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUsernameDuplicate(username)) {
      alert('이미 등록된 이름입니다.');
      return;
    }

    if (!isValidAge(age)) {
      alert('미성연자는 이용할 수 없습니다.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: username,
      age: Number(age),
      email,
      isOnline: isOnline ? 'online' : 'offline',
    };

    addUser(newUser);
    alert("사용자가 등록되었습니다!");

    setUsername('');
    setAge('');
    setEmail('');
    setIsOnline(false);
    navigate("/");
  };


  return (
    <Container>
      <h1>사용자 등록</h1>
      <form onSubmit={handleSubmit}>
        <FormData>
          <DataText>
            <label htmlFor="username">이름</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
          </DataText>
          <DataText>
            <label htmlFor='age'>나이</label>
            <input type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} required />
          </DataText>
          <DataText>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          </DataText>
          <DataStatus>
            <div>상태</div>
            <div>
              <label htmlFor="terms">{isOnline ? "온라인" : "오프라인"}</label>
              <input type='checkbox' id='terms' name='terms' checked={isOnline} onChange={(e) => setIsOnline(e.target.checked)} />
            </div>
          </DataStatus>
          <div>
            <button type="submit">등록하기</button>
            <button type="button" onClick={() => {
              setUsername('');
              setAge('');
              setEmail('');
              setIsOnline(false);
            }}>취소</button>
          </div>
        </FormData>
      </form>
    </Container>
  )
}

export default UserRegistration
