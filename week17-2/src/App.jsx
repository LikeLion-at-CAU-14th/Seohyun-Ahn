import './App.css';
import { Routes, Route } from 'react-router-dom';

import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="
    flex flex-col justify-center items-center
    w-full min-h-[95vh] gap-[30px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} >
          <Route path=":id" element={<BookDetail />} /> 
        </Route>
      </Routes>
    </div>
)}

export default App;