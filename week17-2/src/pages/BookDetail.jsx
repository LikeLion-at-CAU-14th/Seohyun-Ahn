import { useEffect, useState } from 'react'; // React 17부터는 JSX를 쓸 때 import React from 'react'를 자동으로 안 해도 되도록 바뀜
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const Params = useParams();
  const id = Params.id;

  const[books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("/databases/books.json");
      setBooks(response.data);
    }
    fetchBooks();
  
  }, [])

  const book = books.find((b) => b.id === parseInt(id));

  const [likes, setLikes] = useState(0);

  const updateLikes = () => {
    setLikes(likes + 1);
  };

  useEffect(() => {
    setLikes(0);
  }, [id])

  if (!book) {
    return <div>찾는 책이 없습니다.</div>
  }

return (
  <div>
    <h1 className="text-3xl font-bold mb-5">{book.title}</h1>
    <h3 className="text-lg font-bold mb-5">{book.author}</h3>
    <p>{book.description}</p>
    <button 
    onClick={updateLikes}
    className="flex items-center justify-center 
    bg-[#75b5f5] text-white 
    border-none rounded-[25px] 
    px-4 py-1 mt-5
    text-base 
    cursor-pointer 
    transition-colors duration-300 
    hover:bg-[#9ecfff] active:bg-[#3d9dfd]"
    >
      <span className="mr-2 text-xl">👍</span> {likes} 
    </button>
  </div>
)
}
// 원본 코드에서 Icon이 styled.span으로 정의되어 있었기 때문에 그대로 span을 씀

export default BookDetail