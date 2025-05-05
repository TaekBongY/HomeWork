import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

const schema = yup.object({
  email: yup.string().email("이메일을 입력하세요").required("이메일 입력하세요."),
  password: yup.string().min(4, "비밀번호를 입력하세요").required("비밀번호를 입력하세요"),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });



  const onSubmit = async (data) => {
    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        params: {
          email: data.email
        }
      });
  
      const matchedUser = res.data.find(
        (card) => card.password === data.password
      );
  
      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        toast.success("로그인 성공!");
        navigate("/");
      } else {
        toast.error("이메일 또는 비밀번호가 틀렸습니다");
      }
    } catch (err) {
      toast.error("로그인 중 오류 발생");
      console.error(err);
    }
  };

  return (
    <Container>
      <h1>로그인</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit">로그인</button>
    </form>
    </Container>
  );
}