//로컬스토리지의 인증토큰 모아두는 파일

//1. 불일치 방지로 상수로 설정함
const ACCESS_KEY = "access";
const REFRESH_KEY = "refresh";

// 2. getItem 꺼내오는 함수
export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

// 3. setItem 토큰을 로컬스토리지에 저장 
export const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

// 4. 토큰만료나 로그아웃시에 removeItem 토큰 지우는 함수?
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

