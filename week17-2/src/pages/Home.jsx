import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="
      flex flex-col justify-center items-center gap-5 w-full m-5">
        <h1 className="text-[40px] text-[#535353] font-bold">
          week17-2</h1>
        <Link className="flex justify-center items-center w-[300px] h-[100px]
        text-[25px] text-[#4a4a4a] font-medium no-underline
        bg-[#b8edfb] rounded-[20px] cursor-pointer
        shadow-[2px_2px_5px_rgba(0,0,0,0.1)]" 
        to ="/books">Book List📚</Link>
      </div>
    </div>
  )
}

export default Home;