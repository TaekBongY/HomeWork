
import styled from 'styled-components';
import ProfileCard from '../components/Card/ProfileCard';
import SearchDiv from '../components/common/Search';
import useCombinedUsers from '../components/hook/useCombinedUsers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  align-content: flex-start;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
`;

const UserList = () => {
  const { combinedUsers, loading, error } = useCombinedUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <>
      <SearchDiv />
      <Container>
        {combinedUsers.map((user) => (
          <ProfileCard key={user.id} {...user} />
        ))}
      </Container>
    </>
  );
};

export default UserList;
