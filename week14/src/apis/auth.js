import { publicAxios } from "./publicAxios";

//회원가입api요청함수
export const signup = async (id, pw, name, age) => {
  const { data } = await publicAxios.post("/accounts/signup/", {
    id,
    pw,
    name,
    age,
  });
  return data;
}; // /accounts/signup/, 인자id,pw,name,age 는 요청한 백엔드 api 명세서 참고

//로그인api요청함수 -> 성공하면 access token,refresh token 백엔드에게 받음
export const login = async (id,pw) => {
  const { data } = await publicAxios.post("/accounts/login/", { id,pw });
  return data;
};