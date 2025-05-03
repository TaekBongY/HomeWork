import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().email("유효한 이메일을 입력하세요").required("이메일 필수"),
  password: yup.string().min(4, "4자 이상").required("비밀번호 필수"),
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
          email: data.email,
          password: data.password
        }
      });

      if (res.data.length === 1) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("로그인 성공!");
        navigate("/mypage");
      } else {
        toast.error("이메일 또는 비밀번호가 틀렸습니다");
      }
    } catch (err) {
      toast.error("로그인 중 오류 발생");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit">로그인</button>
    </form>
  );
}