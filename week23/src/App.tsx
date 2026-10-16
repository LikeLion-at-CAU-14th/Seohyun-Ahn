import styled from 'styled-components';
import Header from './components/Header';
import TodoStats from './components/TodoStats';
import TodoInput from './components/TodoInput';
import { useState } from 'react';
import type { Todo } from './types/todo';
import TodoItem from './components/TodoItem';
import TodoFilter, { type FilterType } from './components/TodoFilter';

interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}

export default function App() {
  // TODO [STEP 2]: Todo[] 제네릭 상태 선언하기
  const [todos,setTodos]=useState<Todo[]>([]);
  // TODO [STEP 3]: handleAdd 함수 작성하기
  const handleAdd=(text:string)=>{
    const newTodo:Todo={
      id:Date.now(),
      text,
      isDone:false,
    };
    setTodos([...todos,newTodo]);
  }
  // TODO [STEP 4]: handleToggle, handleDelete 함수 작성하기
  const handleToggle = (id:number)=>{
    setTodos(
      todos.map((todo)=>
      todo.id===id?{...todo,isDone:!todo.isDone}:todo)
    );
  };
  const handleDelete=(id:number)=>{
    setTodos(todos.filter((todo)=>todo.id!==id));
  };
  const completedCount = todos.filter((todo)=>todo.isDone).length;
  // TODO [STEP 5]: 명언 상태(quote, author) 및 로딩 상태(isLoading) 선언하기
  const [quote,setQuote]=useState<string>('');
  const [author,setAuthor]=useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);
  // TODO [STEP 5]: DummyJSON API 비동기 통신 함수(handleFetchQuote) 작성하기
  const handleFetchQuote = async()=>{
    try{
      setIsLoading(true);
      const res=await fetch('https://dummyjson.com/quotes/random')
      const data:QuoteResponse=await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error){
      console.error('API 연동 중 오류 발생:',error);
      alert("오늘의 명언을 불러오는데 실패했습니다.");
    }finally{
      setIsLoading(false);
    }
  }

  // 과제
  const [filterType, setFilterType] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
  if (filterType === "active") {
    return !todo.isDone;
  }

  if (filterType === "completed") {
    return todo.isDone;
  }

  return true;
});

  return (
    <Wrapper>
      <Container>
        <Header />
        <TodoStats total={todos.length} completed={completedCount} />
        <AdviceSection>
          {/* TODO [STEP 5]: 버튼에 함수 연결하기 */}
          <RecommendButton onClick={handleFetchQuote}disabled={isLoading}>
           {isLoading? '명언 가져오는 중...':'오늘의 동기부여 명언 보기'}
          </RecommendButton>
          
          {/* TODO [STEP 5]: quote가 있을 때만 화면에 렌더링되도록 조건 걸기 */}
          <AdviceBox>
            <QuoteText>"{quote}"</QuoteText>
            <QuoteAuthor>- {author} -</QuoteAuthor>
          </AdviceBox>
        </AdviceSection>

        <TodoInput onAdd={handleAdd} />
          <TodoFilter
            filterType={filterType}
            onFilterChange={setFilterType}
          />
        <TodoList>
        {filteredTodos.length === 0 ? (
          <Empty>할 일이 없습니다.</Empty>
        ):(
          filteredTodos.map((todo)=> (
            <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            />
          ))
        )}
        </TodoList>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 60px 24px;
`;

const TodoList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Empty = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 15px;
  padding: 40px 0;
`;

 
const AdviceSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AdviceBox = styled.div`
  padding: 16px 20px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuoteText = styled.p`
  font-size: 15px;
  color: #343a40;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
`;

const QuoteAuthor = styled.p`
  font-size: 13px;
  color: #868e96;
  text-align: right;
  margin: 0;
  font-weight: 600;
`;

const RecommendButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #f0f4ff;
  color: #4c6ef5;
  border: 1px dashed #748ffc;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dbe4ff;
  }
`;