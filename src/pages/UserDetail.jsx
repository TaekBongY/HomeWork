import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../components/context/UserContext';
import useCombinedUsers from '../components/hook/useCombinedUsers';
import { MdDriveFileRenameOutline } from "react-icons/md";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0bbff, #ffc1cc);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
  padding : 50px;
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
    color: white;
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

const CardBox = styled.div`
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

const Htitle = styled.h1`
  color: #4b0082;
`;

const Pfont = styled.p`
  font-size: 16px;
  color: #6a1b9a;
  font-weight: bold;
`;

const Dfont = styled.div`
  font-size: 16px;
  color: #6a1b9a;
  font-weight: bold;
  padding:10px;
`;

const IMG = styled.img`
  width: 100%;
`;

const ImgDiv = styled.div`
  max-width: 50%;
`;

const InfoBox = styled.div`
  width: 100%;
  text-align: left;
`;

const UserDetail = () => {
  const { dataId  } = useParams();
  const navigate = useNavigate();
  const { deleteUser } = useUserContext();
  const { combinedUsers, loading, error } = useCombinedUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;


  if (!combinedUsers || combinedUsers.length === 0) {
    return <div>사용자 데이터를 찾을 수 없습니다.</div>;
  }


  const user = combinedUsers.find((item) => String(item.DataId) === String(dataId));

  if (!user) {
    return <div>사용자 또는 게시글 데이터를 찾을 수 없습니다.</div>;
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(Number(user.id));
      window.alert('삭제하였습니다.');
      navigate('/');
    }
  };

  return (
    <Container>
      <CardBox>
        <InfoBox>
          <Htitle>{user.title}</Htitle>
        </InfoBox>
        <ImgDiv>
          <IMG src={user.image} alt=""/>
        </ImgDiv>
        <InfoBox>
          <Pfont><MdDriveFileRenameOutline /> {user.name}</Pfont>
          <Dfont>{user.detail}</Dfont>
        </InfoBox>
        <ButtonGroup>
          <Btn onClick={() => navigate(`/edit/${user.DataId}`)}>수정하기</Btn>
          <Btn onClick={() => navigate('/')}>목록으로</Btn>
          <Btn onClick={handleDelete}>삭제하기</Btn>
        </ButtonGroup>
      </CardBox>
    </Container>
  );
};

export default UserDetail;
