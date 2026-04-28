import DOM from "./DOM.js"; //자동완성하기

class Button extends DOM {
  constructor(innerText, className){
    super('buttom', innerText, className);
  }
}

export default Button;