import Button from "./Button.js";
import Div from "./Div.js";

class Todo {
  constructor(todo){
    this.row = new Div('','row').node; 
    this.textBox = new Div(todo, 'text-box');
    
    this.completeBtn = new Button('', 'complete-btn');
    this.delBtn = new Button('', 'del-btn') // 버튼 글씨를 이미지가 대신해 필요없으므로 빈문자열로 둠 
    
    const completeImg = new Image(); //Image 객체를 생성하여 속성 설정
    completeImg.src = './DOM/check.png'; //이미지를 준비함
    completeImg.alt = '완료';
    
    const delImg = new Image();
    delImg.src = './DOM/x.png'; 
    delImg.alt = '삭제';
    
    this.completeBtn.node.appendChild(completeImg);//버튼의 실제 HTML 요소인 .node에 이미지 객체를 추가(위에서 준비한 이미지를 버튼에 넣음)
    this.delBtn.node.appendChild(delImg);
  } 

  addRow(){
    [this.textBox, this.completeBtn, this.delBtn].forEach((dom) =>{
      this.row.appendChild(dom.node);

    });
    return this.row;
  }

  getRow(){
    return this.row;
  }
  getCompleteBtn(){
    return this.completeBtn.node;
  }
  getDelBtn(){
    return this.delBtn.node;
  }
  getInnerText(){
    return this.textBox.node;
  }
}

export default Todo;