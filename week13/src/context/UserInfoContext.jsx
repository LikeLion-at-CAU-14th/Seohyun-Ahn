import { createContext, useContext, useReducer } from "react";

// Context 생성
export const UserInfoContext = createContext();

// 초기 상태 -> bc. useReducer는 초기 상태를 두 번째 인자로 따로 받아야함
const initialState = {
  name: "",
  email: "",
  birth: "",
  gender: "",
};

// reducer -> 상태를 변경해 달라고 요청하는 함수인 dispatch()가 호출되면 어떤 방식으로 상태를 변경할지 결정하는 함수
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        ...action.payload, 
      };

    default:
      return state;
  }
};

// Provider -> 모든 하위 컴포넌트(Home, MyPage)가 state와 dispatch를 사용할 수 있음
export const UserInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserInfoContext.Provider value={{ state, dispatch }}>
      {children}
    </UserInfoContext.Provider>
  );
};

//커스텀 훅
export const useUserInfo = () => useContext(UserInfoContext);