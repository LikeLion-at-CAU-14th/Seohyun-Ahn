import TodoController from "./controller/TodoController.js";

const addBtn = document.getElementById('input');
const input = document.querySelector('input');

addBtn.addEventListener('click',() => {
  const todoController = new TodoController(input.value);
  todoController.addTodo();
  input.value = '';
})

//추가가 안되는 오류가 나서 import하는 주소 모든 곳에 js를 붙이니 해결됨