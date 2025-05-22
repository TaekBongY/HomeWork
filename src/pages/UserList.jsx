import styled from 'styled-components';
import ProfileCard from '../components/Card/ProfileCard';
import useCombinedUsers from '../components/hook/useCombinedUsers';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  align-content: flex-start;
  box-sizing: border-box;
  padding-top: 10px;
  gap: 16px;
`;

const LoaderWrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserList = () => {
  const { combinedUsers, loading, error } = useCombinedUsers();

  if (loading) {
    return (
      <LoaderWrapper>
        <ClipLoader color="#9b59b6" size={60} />
      </LoaderWrapper>
    );
  }

  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <>
      <Container>
        {combinedUsers.map((user) => (
          <ProfileCard key={user.id} {...user} />
        ))}
      </Container>
    </>
  );
};

export default UserList;
