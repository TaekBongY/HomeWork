import React from 'react';

const MyPage = () => {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <div>로그인 정보가 없습니다. 로그인 해주세요.</div>;
  }

  return (
    <div>
      <h1>마이 페이지</h1>
      <p>{user.name}님, 환영합니다!</p>
      <p>이메일: {user.email}</p>

    </div>
  );
};

export default MyPage;