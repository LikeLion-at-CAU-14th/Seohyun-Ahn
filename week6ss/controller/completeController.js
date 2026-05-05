import Complete from "../DOM/complete.js";

class CompleteController{
  constructor(todoText){ //완료된 텍스트 내용을 인자로 받아 Complete UI 컴포넌트 생성
    this.completeTodo = new Complete(todoText);
  }
  addCompleteTodo(){ //// 완료 목록에 항목을 추가하는 메서드
    const completeList = document.getElementById("complete-list");
    if (completeList) {
      completeList.appendChild(this.completeTodo.addRow());
    }
  }
}

export default CompleteController;