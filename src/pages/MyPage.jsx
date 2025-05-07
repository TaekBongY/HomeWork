import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 90vh;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
  justify-content:center;
  align-items:center;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
`;

const Btn = styled.button`
  background-color: #594c5a;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: auto;
`;
const CardBox = styled.form`
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #ffffff50;
  border-radius: 16px;
  padding: 24px;
  width: 80%;
  max-width: 600px;
  height: 80vh;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;
const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  gap: 8px;
  

  label {
    flex: 1;
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
  }

  input {
    flex: 2;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const MyPage = () => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(parsedUser);
  const [editUser, setEditUser] = useState(parsedUser);
  const [isEdit, setIsEdit] = useState(false);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEditToggle = () => {
    if (isEdit) {
      if (password !== user.password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      setUser(editUser);
      localStorage.setItem("user", JSON.stringify(editUser));
      alert('저장되었습니다!');
      setPassword('');
    } else {
      setEditUser(user);
    }

    setIsEdit(prev => !prev);
  };

  const handleCancel = () => {
    setEditUser(user);
    setPassword('');
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setEditUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return <div>로그인 정보가 없습니다. 로그인 해주세요.</div>;
  }

  return (
    <Container>
      <CardBox>

        <h1>{user.name}님 마이 페이지</h1>
        <div>
          <p>이메일: {user.email}</p>
          <FormRow>
          {isEdit ? (
            <>
              <label>나이</label>
              <input name="age" value={editUser.age} onChange={handleChange} />
              <br />
              
            </>
          ) : (
            <p>나이: {user.age}</p>
          )}
          <br />
          
            {isEdit ? (
              <div>
              <label>비밀번호 </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              </div>
            ) : (
              ''
            )}
          
              
</FormRow>
{isEdit ? (
  <div>
    <label>
      <input
        type="checkbox"
        checked={editUser.isOnline === 'online'}
        onChange={(e) =>
          setEditUser((prev) => ({
            ...prev,
            isOnline: e.target.checked ? 'online' : 'offline',
          }))
        }
      />
      온라인 상태
    </label><br/>
    
  </div>
) : (
  <p>{user.isOnline === 'online' ? '🟢 온라인' : '🔴 오프라인'}</p>
  
)}
        </div>

        <ButtonGroup>
          <Btn type="button" onClick={handleEditToggle}>
            {isEdit ? '저장하기' : '수정하기'}
          </Btn>
          <Btn type="button" onClick={isEdit ? handleCancel : () => navigate('/')}>
            {isEdit ? '취소' : '메인으로'}
          </Btn>
        </ButtonGroup>
      </CardBox>
    </Container>
  );
};

export default MyPage;
