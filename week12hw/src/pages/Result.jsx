import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from "../api";

const Result = () => {
  const { score } = useParams();

  const [result, setResult] = useState({});

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const getResult = async () => {
      const response = await api.get(`/api/result?score=${score}`);
      setResult(response.data);
    };

    getResult();
  }, []);

  return (
    <div>
      <h1>📜 Quiz Result 📜</h1>

      <H2>점수 : {result.score} / 5</H2>

      <h3>{result.message}</h3>

      <button onClick={goHome}>Home 🏠</button>
    </div>
  );
};

export default Result

const Button = styled.button`
  background-color: #75b5f5;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9ecfff;
  }

  &:active {
    background-color: #3d9dfd;
  }
`;


const H2 = styled.h2`
  color: red;
`;

