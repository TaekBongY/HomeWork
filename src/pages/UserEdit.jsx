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
  const { addCard, updateCard, loggedInUser } = useUserContext();
  const { combinedUsers, loading } = useCombinedUsers();
  const isAdding = id === 'new';
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    detail: '',
    image: ''
  });

  useEffect(() => {
    if (isAdding && loggedInUser) {
      setFormData(prev => ({
        ...prev,
        name: loggedInUser.name || '' 
      }));
    } else if (id && id !== 'new' && combinedUsers.length > 0) { 
      console.log('id:', id);
      const user = combinedUsers.find(user => {
        console.log('user.dataid:', user.DataId);
        return user.DataId == id;
      });
      console.log('user:', user);

      if (user) {
        setFormData({
          name: user.name || '',
          title: user.title || '',
          detail: user.detail || '',
          image: user.image || ''
        });
      }
    }
  }, [id, combinedUsers, isAdding, loggedInUser]);
  
  
  

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) { 
      if (!loggedInUser) {
        alert('로그인이 필요합니다.');
        return;
      }
      const newUserEntry = {
         id: String(loggedInUser.id),
         DataId: String(Date.now()),
         name: formData.name,
         title: formData.title,
         detail: formData.detail,
         image: formData.image,
      };
      const addedEntry = await addCard(newUserEntry);
      alert('게시글이 추가되었습니다!');
      navigate(`/user/${addedEntry.DataId}`);
    } else if (id && id !== 'new') { 
      
      const updatedEntry = {
        id: String(loggedInUser.id),
        DataId: formData.DataId,
        name: formData.name,
        title: formData.title,
        detail: formData.detail,
        image: formData.image,
      };

      await updateCard(id,updatedEntry);
      alert('수정되었습니다!');
      navigate(`/user/${id}`);
    }
  };


  if (loading) return <div>로딩 중...</div>;

  return (
    <Container>
      <CardBox onSubmit={handleSubmit}>
        <Htitle>{isAdding ? '새 게시글 작성' : '게시글 정보 수정'}</Htitle>
        <input type='hidden' value={formData.DataId} onChange={handleChange} placeholder={String(Date.now())}/>
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
          placeholder="내용"
          rows={5}
        />
        <ButtonGroup>
          <Btn type="submit">{isAdding ? '작성 완료' : '저장'}</Btn>
          <Btn type="button" onClick={() => navigate(-1)}>취소</Btn>
        </ButtonGroup>
      </CardBox>
    </Container>
  );
};

export default UserEdit;
