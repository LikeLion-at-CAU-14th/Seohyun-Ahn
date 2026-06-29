import React from 'react'
import './App.css';

import { Routes, Route } from 'react-router-dom';


import styled from 'styled-components';
import Result from './pages/Result';
import Quiz from './pages/Quiz';
import Home from './pages/Home';

const App = () => {
  return (
    <AppDom>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<Quiz />} />
        <Route path="/result/:score" element={<Result />} /> 
      </Routes>
    </AppDom>
)} 

export default App;

const AppDom = styled.div`
  display: flex;
  width: 100%;
  min-height: 95vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;