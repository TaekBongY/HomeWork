import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useUserContext } from '../components/context/UserContext';
import useCombinedUsers from '../components/hook/useCombinedUsers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
  padding: 50px;
`;

const CardBox = styled.form`
  background-color: rgba(255, 255, 255, 0.15);
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
`;

const Htitle = styled.h2`
  color: #4b0082;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  resize: none;
`;

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
    transition: all 0.3s ease-in-out;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: auto;
`;

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addUser, updateUser } = useUserContext();
  const { combinedUsers, loading } = useCombinedUsers(); // combinedUsers와 loading 상태 받아오기

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    detail: '',
    image: ''
  });

  useEffect(() => {
    if (id && combinedUsers.length > 0) {
      console.log('id:', id); // 확인용
      const user = combinedUsers.find(user => {
        console.log('user.id:', user.id); // 확인용
        return user.id === id;  // id 값은 문자열로 비교
      });
      console.log('user:', user);  // 찾은 user 출력
  
      if (user) {
        setFormData({
          name: user.name || '',
          title: user.title || '',
          detail: user.detail || '',
          image: user.image || ''
        });
      }
    }
  }, [id, combinedUsers]);
  
  
  

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateUser(Number(id), formData);
      alert('수정되었습니다!');
      navigate(`/user/${id}`);
    } else {
      const newUser = await addUser(formData);
      alert('게시글이 추가되었습니다!');
      navigate(`/user/${newUser.id}`);
    }
  };

  if (loading) return <div>로딩 중...</div>; // 로딩 중일 때 대기

  return (
    <Container>
      <CardBox onSubmit={handleSubmit}>
        <Htitle>{id ? '게시글 정보 수정' : '게시글 추가'}</Htitle>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목"
        />
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름"
        />
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="이미지 URL"
        />
        <TextArea
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          placeholder="설명"
          rows={5}
        />
        <ButtonGroup>
          <Btn type="submit">저장</Btn>
          <Btn type="button" onClick={() => navigate(-1)}>취소</Btn>
        </ButtonGroup>
      </CardBox>
    </Container>
  );
};

export default UserEdit;
