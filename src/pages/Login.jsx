import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ClipLoader } from "react-spinners"; // ClipLoader 스피너 가져오기

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const schema = yup.object({
  email: yup.string().email("이메일을 입력하세요").required("이메일 입력하세요."),
  password: yup.string().min(4, "비밀번호를 입력하세요").required("비밀번호를 입력하세요"),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);  // 로딩 상태를 관리하기 위한 state

  const onSubmit = async (data) => {
    setLoading(true); // 폼 제출 시 로딩 시작

    try {
      const res = await axios.get(`http://localhost:3001/users`, {
        params: {
          email: data.email,
        },
      });

      const matchedUser = res.data.find(
        (card) => card.password === data.password
      );

      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        toast.success("로그인 성공!");
        location.href = "/";
      } else {
        toast.error("이메일 또는 비밀번호가 틀렸습니다");
      }
    } catch (err) {
      toast.error("로그인 중 오류 발생");
      console.error(err);
    } finally {
      setLoading(false);  // 로그인 작업이 끝난 후 로딩 종료
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

        <button type="submit" disabled={loading}>로그인</button>

        {loading && (
          <div style={{ marginTop: "20px" }}>
            <ClipLoader color="#00bfff" loading={loading} size={50} />
          </div>
        )}
      </form>
    </Container>
  );
}
