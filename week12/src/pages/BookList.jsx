import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import BookDetail from './BookDetail';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]); //책목록상태변수
  
  const navigate = useNavigate(); //페이지이동함수가져오기

  const goHome = () => {
    navigate("/")
  } //홈으로 이동하는 함수 타이틀 클릭시 호출됨

  // useeffect로 렌더링될때 한번만 데이터 가져오기
  // databases/books.json에 저장한 데이터를 axios로 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("/databases/books.json");
      setBooks(response.data);
    }
    fetchBooks();
  
  }, [])

  return (
    <MenuDom>
      <BookListDom>
        <Title onClick={goHome}>Home🏠</Title>
        <Title>Book List📚</Title>
        <ul>
          {/*실습12 id와 연결 링크로 연결*/}
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <li>{book.title}</li>
            </Link>
          ))}
 
        </ul>
      </BookListDom>
      <BookDetailDom>

        <Outlet />
      </BookDetailDom>
    </MenuDom>
  )
}


export default BookList


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
`;

const BookListDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
  padding: 50px;
  height: 80%;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const BookDetailDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 50px;
  height: 100%;
  border-radius: 0 10px 10px 0;
  margin-top: 100px;
`;