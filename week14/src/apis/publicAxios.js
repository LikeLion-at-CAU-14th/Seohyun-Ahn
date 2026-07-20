// axios사용시 주소 적어줘야함-> 귀찮으면 미리 저장하는 파일

import axios from "axios";

export const BASE_URL = "https://lion-fe.onrender.com";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});