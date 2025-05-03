import React from 'react';

const MyPage = () => {
  // 로컬 스토리지나 Context에서 로그인한 사용자 정보 가져오기
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
      {/* 여기에 마이페이지 관련 내용을 추가할 수 있습니다. */}
    </div>
  );
};

export default MyPage;