// 1. js파일에서 접근해야하는 html dom 요소 선언(DOM과 연결)
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

const computerText = document.getElementById("computer-hand-text");
const computerIcon = document.getElementById("computer-hand-icon");

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

//2.이벤트 설정(클릭에 반응)
rockBtn.addEventListener("click", displayMyChoice);
scissorsBtn.addEventListener("click", displayMyChoice);
paperBtn.addEventListener("click", displayMyChoice);

//3.displayMyChoice 함수 설정
function displayMyChoice(e) {
  let clickedBtn = e.currentTarget.id;
  let clickedIcon = e.target.className;

  myHandText.innerText = clickedBtn;
  myHandIcon.className = clickedIcon; //나중에 classname대신 id를 사용하면 더 정확

  start(clickedBtn);
}

//4. 랜덤으로 뱉는 컴퓨터
function getComChoice(){
  const randomValue = {
    0 : ["rock", "fa-regular fa-hand-back-fist"], //클래스에 담음
    1 : ["scissors", "fa-regular fa-hand-scissors fa-rotate-90"],
    2 : ["paper", "fa-regular fa-hand"],
  };

  const randomIndex = Math.floor(Math.random()*3); //0,1,2중 랜덤값을 고름

  return randomValue[randomIndex];
}

//5.컴퓨터의 선택이 화면에 보이도록 하는 함수
function displayComChoice(result) {
  computerText.innerText = result[0];
  computerIcon.className = result[1];
}

//6.start함수
function start(userchoice){
  let resultArray = getComChoice();
  displayComChoice(resultArray);

  connect(userchoice, resultArray[0]); //user선택과 computer선택(배열에서 첫번째 값) 꺼냄
}

//7. 점수판 기능 구현
const userScoreText = document.querySelector(".my-score"); //기존에 html에 있던 요소와 이름 맞춰 연결, class선택자는 앞에 . 붙여야함
const computerScoreText = document.querySelector(".computer-score");

let userScore = 0;
let computerScore = 0; //변수의 역할을 나눠야함! DOM화면요소와 점수 데이터, 변수 이름 중복 주의

function displayScore(){ //점수 표시 함수
    userScoreText.innerText = userScore;
    computerScoreText.innerText = computerScore;
}




//8. 승패를 비교하여 페이지 중앙에 승부 결과 텍스트 띄우기
const resultText = document.getElementById("display-result");

function displayResult(result){ //승패 표시 함수
    resultText.innerText = result;
}

function compareResult(user, computer){ //승패 비교 함수
    if(user === computer){ //---는 값과 타입 비교 연산자
        return "Tie"; // if가 true이면 return 실행, return은 함수 종료와 값 반환 역할
    }

    if(
        (user === "scissors" && computer === "paper") || // ||는 논리 OR 연산자, 둘 중 하나라도 true면 true임-> if 뒤의 3가지 조건중 하나라도 true면 실행
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock")
    ){
        return "user Win";
    } else {
        return "user Lose";
    }
} 

function connect(user, computer){ //점수와 승패 연결 함수
  const result = compareResult(user, computer);

  if(result === "user Win"){ 
    userScore++; //값 증가하고 변수에 저장
  } else if(result === "user Lose"){
    computerScore++;
  }

  displayScore(); //점수 표시 함수에 반영
  displayResult(result);
}


//9. 리셋 버튼을 만들어서 게임 초기화 기능 추가
const resetBtn = document.getElementById("reset-button");

resetBtn.addEventListener("click", reset);

function reset(){
    userScore = 0; // 변수 초기화
    computerScore = 0;

    displayScore(); // 점수판에 반영
    displayResult(""); // 승패 결과 초기화

    myHandText.innerText = ""; //텍스트 초기화
    computerText.innerText = "";

    myHandIcon.className = ""; //손 아이콘 초기화
    computerIcon.className = "";
}