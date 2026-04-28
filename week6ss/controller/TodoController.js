import Todo from "../DOM/Todo.js";
import CompleteController from "./completeController.js";

class TodoController{
  constructor(todo){
  this.newTodo = new Todo(todo);
  this.delBtnNode= this.newTodo.getDelBtn();
  this.comBtnNode= this.newTodo.getCompleteBtn();
  this.innerNode= this.newTodo.getInnerText();

  this.delBtnNode.addEventListener('click', () => {
    this.delTodo();
  });

  this.comBtnNode.addEventListener('click', () => {
    this.doneTodo();
  });
 }

  addTodo(){
    const todoList = document.getElementById("to-do-list");
    const input = document.querySelector('input');
    todoList.appendChild(this.newTodo.addRow());
    input.value = '';
  }

  delTodo(){
    const todoList = document.getElementById("to-do-list");
    todoList.removeChild(this.newTodo.getRow());
  }

  doneTodo(){
    this.innerNode.classList.toggle('done-text');
    this.comBtnNode.classList.toggle('done-btn');
    if(this.comBtnNode.innerText === "미완") {
      this.comBtnNode.innerText = "완료";
    } else{
      this.comBtnNode.innerText = "미완";
    }

    const todoText = this.innerNode.innerText; //텍스트 가져오기

    this.delTodo(); //기존 todo 리스트에서 삭제

    const completeController = new CompleteController(todoText); //omplete 리스트로 이동
    
    completeController.addCompleteTodo();
  }
}

export default TodoController;