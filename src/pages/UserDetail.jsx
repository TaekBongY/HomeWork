import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../components/context/UserContext'; // useUserContext로 변경
import useCombinedUsers from '../components/hook/useCombinedUsers'; // combinedUsers는 그대로 사용
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
`
const ImgDiv = styled.div`
  max-width:50%;
`
const InfoBox = styled.div`
  width: 100%;
  text-align: left;
`;

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {deleteUser } = useUserContext(); // useUserContext 사용
  const { combinedUsers, loading, error } = useCombinedUsers(); // combinedUsers 그대로 사용

  // 로딩 상태 체크
  if (loading) return <div>Loading...</div>;

  // 에러 상태 체크
  if (error) return <div>오류 발생: {error.message}</div>;

  // combinedUsers 배열이 비어있는지 체크
  if (!combinedUsers || combinedUsers.length === 0) {
    return <div>사용자 데이터를 찾을 수 없습니다.</div>;
  }

  // id로 해당 사용자 찾기
  const user = combinedUsers.find((user) => user.id == id);

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(Number(id)); // useUserContext의 deleteUser 호출
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
          <Pfont>{user.name}</Pfont>
          <Dfont>{user.detail}</Dfont>
        </InfoBox>
        <ButtonGroup>
          <Btn onClick={() => navigate(`/edit/${user.id}`)}>수정하기</Btn>
          <Btn onClick={() => navigate('/')}>목록으로</Btn>
          <Btn onClick={handleDelete}>삭제하기</Btn>
        </ButtonGroup>
      </CardBox>
    </Container>
  );
};

export default UserDetail;
