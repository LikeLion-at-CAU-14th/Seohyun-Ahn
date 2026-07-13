// 개인정보상 public과 private 구분 
import axios from "axios";
import { clearTokens, getAccessToken } from "../auth/tokenStorage";
import { BASE_URL } from "./publicAxios";

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

privateAxios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      clearTokens(); // 토큰 삭제

      window.location.href = "/"; // 로그인 페이지로 이동

    }

    return Promise.reject(error); 

  },
);
// privateAxios.js는 React 컴포넌트가 아니기 때문에 useNavigate()를 사용할 수 없어서 window.location.href사용
