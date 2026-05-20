import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // 현재 주소를 알아내기 위한 훅

import photo1 from '../assets/1.jpg'; 
import photo2 from '../assets/2.jpg';

const ContentBox = () => {
  const location = useLocation(); // 현재 어떤 경로인지 정보를 가져옴

  // 각 경로에 보여줄 내용을 하나의 객체로 정리
  const contentData = {
    '/major': 'majoring in Early Childhood Education👶 at Chung-Ang University (Class of 2024)',
    
    '/interests': (
      <>
        Chung-Ang University LikeLion 14th Frontend🦁 <br /> 
        Education & Technology
      </>
    ),    
    
    '/location': (
      <>
        from Suwon, South Korea <br /> 
        now based in Seoul, South Korea
      </>
    ), 
    
    '/contact': (
      <>
        Email: sarah1007v@naver.com💌 <br /> 
        Instagram: 
        <a 
          href="https://www.instagram.com/ahn_shyun" 
          target="_blank"           // 새 탭에서 열기
          style={{ 
            color: '#E1306C',       // 인스타그램 포인트 컬러
            textDecoration: 'none', // 밑줄 제거
            fontWeight: 'bold',
            marginLeft: '5px'
          }}
        >
          @ahn_shyun
        </a>
      </>
    ), 

    '/gallery': (
      <div>
        <img src={photo1} alt="사진1" style={{ width: '300px', marginBottom: '10px' }} />
        <img src={photo2} alt="사진2" style={{ width: '300px', marginBottom: '10px' }} />
      </div> // JSX에서는 하나의 객체로 묶어줘야함
    ),

    '/fun-fact': (
      <>
        my name "Seohyun 서현" <br /> 
        comes from the characters meaning "Dawn 曙" and "Sunlight 晛" <br /> 
        means "the Sunlight of Dawn." 🌅
      </>
    ),
    
  };

  // 현재 경로에 해당하는 내용이 있는지 확인
  const currentContent = contentData[location.pathname];

  // 내용이 있을 때만 박스를 보여줌 (클릭 전에는 안 나타남)
  if (!currentContent) return null; 

  return <StyledBox>{currentContent}</StyledBox>;
};

export default ContentBox;

const StyledBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff7ed;
  border-radius: 12px;
  text-align: center;
  color: #a06240;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;