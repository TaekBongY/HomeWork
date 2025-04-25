import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;


const UserRegistration = () => {
  return (
    <Container>
      <h1>사용자 등록</h1>
      <form>
        <FormData>
          <DataText>
            <label htmlFor="username">이름</label>
            <input type="text" id="username" name="username" required />
          </DataText>
          <DataText>
            <label htmlFor='age'>나이</label>
            <input type="number" id="age" name="age" required />
          </DataText>
          <DataText>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" required />
          </DataText>
          <DataStatus>
            
            <input type='checkbox' id='terms' name='terms' required />
            <label htmlFor="terms">온라인 상태</label>
          </DataStatus>
          <div>
            <button type="submit">등록하기</button>
            <button type="button" onClick>취소</button>
          </div>
        </FormData>
      </form>
    </Container>
  )
}

export default UserRegistration
