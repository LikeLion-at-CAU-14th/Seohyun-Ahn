import React, { useContext, useState } from 'react'
import { ThemeColorContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Wrapper, Title } from '../layout/common';
import Form from './Form';
import { useUserInfo } from '../../context/UserInfoContext';

const FormSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    birth: "",
    gender: "",
    }); // useState와 handleChange는 컴포넌트 밖이 아닌, 함수 안에 있어야함

    // 함수 하나로 객체 안의 값을 가져오기 위한 사용자 정보 형태 변경 처리 가능
    const handleChange = (e) => {
      const { name, value } = e.target;

      setForm({
        ...form,
        [name]: value,
        });
    }; 

    const mode = useContext(ThemeColorContext);
    const navigate = useNavigate();

    const { dispatch } = useUserInfo();

    const handleSubmit = () => {
      dispatch({
        type: "SET_USER_INFO",
        payload: form,
    }); // dispatch를 먼저 호출한 뒤 이동

  navigate("/mypage");
};

  return (
    <Wrapper>
      <Card>
        <Title> 회원 정보 입력 </Title>
        <Form
          type="text"
          label="이름"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Form
          type="email"
          label="이메일"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Form
          type="date"
          label="생년월일"
          name="birth"
          value={form.birth}
          onChange={handleChange}
        />
        <Form
          label="성별"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        />

        <Button
          mode={mode.button}
          onClick={handleSubmit}
        >
          제출하기
        </Button>

      </Card>
    </Wrapper>
  )
}

export default FormSection