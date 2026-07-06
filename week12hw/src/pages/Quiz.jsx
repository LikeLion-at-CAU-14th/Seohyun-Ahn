import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Result from './Result';
import api from "../api"; // axios대신 baseURL

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 문제 변수
  const [answers, setAnswers] = useState([]); // 퀴즈 답변 변수

  const navigate = useNavigate(); //페이지이동함수가져오기

  const goHome = () => {
    navigate("/")
  } //홈으로 이동하는 함수 타이틀 클릭시 호출됨


  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await api.get("/api/questions");
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, [])

 // 답 입력
  const answerChange = (index, value) => {
    let newAnswers = [...answers]; // 복사

    newAnswers[index] = {
      id: index,
      answer: value,
    };

    setAnswers(newAnswers); // 상태 업데이트 
  };

  // 제출
  const submitQuiz = async () => {
  for (let i = 0; i < 5; i++) {
    if (!answers[i] || answers[i].answer === "") {
      alert("정확히 5개의 답안을 제출해야 합니다."); // error 선언 안해서 문구 그대로
      return;
    }
  } // 1번부터 5번 문제까지 확인, 해당 문제를 입력하지 않았거나 빈칸이면, 경고창을 띄우고 제출을 중단

  try {
    const response = await api.post("/api/answers", {
      answers: answers,
    });

    let score = 0;

    for (let i = 0; i < response.data.results.length; i++) {
      if (response.data.results[i].correct) {
        score++;
      }
    }

    navigate(`/result/${score}`);
  } catch (error) {
    alert(error.response.data.error);
  }
};

  return (
    <QuizDom>
      <Title onClick={goHome}>🏠 Home</Title>

      <TitleQ>📜 Quiz</TitleQ>

      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <h3>{quiz.question}</h3>

          <input
            type="text"
            placeholder="답을 입력하세요"
            onChange={(e) =>
              answerChange(quiz.id, e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={submitQuiz}>제출✔️</button>
    </QuizDom>
  );
};


export default Quiz


const MenuDom = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 80vh;
  margin: 20px;
`;

const Title = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;

  cursor: pointer; /*추가*/
  &:hover {
    color: #4a90e2;
  }
`;

const TitleQ = styled.div`
  font-size: 40px;
  color: #535353;
  font-weight: 700;

`;

const QuizDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
  padding: 50px;
  height: 80%;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ResultDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 50px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  margin-top: 100px;
`;