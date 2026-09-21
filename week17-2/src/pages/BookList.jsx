import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]); 

  const navigate = useNavigate(); 

  const goHome = () => {
    navigate("/")
  } 

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("/databases/books.json");
      setBooks(response.data);
    }
    fetchBooks();
  
  }, [])

  return (
    <div className="
    flex justify-start items-center gap-5 w-full h-[80vh] m-5">
      <div className="
      flex flex-col justify-start bg-white
      p-[50px] h-[80%] rounded-r-[10px]
      shadow-[2px_2px_5px_rgba(0,0,0,0.1)]">
        <h1 className="text-[40px] text-[#535353] font-bold" onClick={goHome}>
          Home🏠</h1>
        <h1 className="text-[40px] text-[#535353] font-bold mb-5">
          Book List📚</h1>

        <ul className="list-disc list-inside"> 
          {books.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <li>{book.title}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="
      flex flex-col justify-start items-center
      p-[50px] h-full rounded-r-[10px] mt-[100px]">
        <Outlet />
      </div>
    </div>
  )
} 
// top-left, top-right, bottom-right, bottom-left 순서 -> 오른쪽 의미 rounded-r 사용
// Tailwind 임의값 안에서는 공백을 언더스코어(_)로 대체

export default BookList