import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useUsers from '../components/hook/useUsers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`

const DataStatus = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const schema = yup.object().shape({
  username: yup.string().required('이름은 필수입니다.'),
  age: yup
    .number()
    .typeError('숫자만 입력하세요')
    .required('나이는 필수입니다.')
    .min(18, '미성년자는 등록할 수 없습니다.')
    .max(100, '나이가 너무 많습니다.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일은 필수입니다.'),
  password: yup.string().required('비밀번호는 필수입니다.'),
  isOnline: yup.boolean(),
})

const UserRegistration = () => {
  const navigate = useNavigate()
  const { addUser, users } = useUsers()

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      age: '',
      email: '',
      password: '',
      isOnline: false,
    },
  })

  const onSubmit = (data) => {
    if (users.some((user) => user.name === data.username)) {
      setError('username', { message: '이미 등록된 이름입니다.' })
      return
    }

    const newUser = {
      id: String(Date.now()),
      name: data.username,
      age: Number(data.age),
      email: data.email,
      password: data.password,
      isOnline: data.isOnline ? 'online' : 'offline',
    }

    addUser(newUser)
    alert('사용자가 등록되었습니다!')
    reset()
    navigate('/')
  }

  return (
    <Container>
      <h1>사용자 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormData>
          <DataText>
            <label htmlFor="username">이름</label>
            <input id="username" {...register('username')} />
          </DataText>
          <span>{errors.username?.message}</span>

          <DataText>
            <label htmlFor="age">나이</label>
            <input id="age" type="number" {...register('age')} />
          </DataText>
          <span>{errors.age?.message}</span>

          <DataText>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" {...register('email')} />
          </DataText>
          <span>{errors.email?.message}</span>

          <DataText>
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" {...register('password')} />
          </DataText>
          <span>{errors.password?.message}</span>

          <DataStatus>
            <div>상태</div>
            <Controller
              control={control}
              name="isOnline"
              render={({ field }) => (
                <div>
                  <label>{field.value ? '온라인' : '오프라인'}</label>
                  <input type="checkbox" {...field} checked={field.value} />
                </div>
              )}
            />
          </DataStatus>

          <div>
            <button type="submit">등록하기</button>
            <button type="button" onClick={() => reset()}>초기화</button>
          </div>
        </FormData>
      </form>
    </Container>
  )
}

export default UserRegistration
