import Div from "./Div.js";

class Complete {
  constructor(complete){
    this.row = new Div('','row').node; 
    this.textBox = new Div(complete, 'text-box');
  }
   
  addRow(){
    [this.textBox].forEach((dom) =>{
      this.row.appendChild(dom.node);
    });
    return this.row;
  }

  getRow(){
    return this.row;
  }

  getInnerText(){
    return this.textBox.node;
  }
}

export default Complete;