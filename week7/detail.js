const container = document.getElementById("detail");

const data = JSON.parse(localStorage.getItem("photoData")); // 저장된 데이터 꺼내기

function formatDate(dateStr) { //날짜 포맷 변환 함수->API 날짜는 보통 202301011234 이런 식이라서 YY/MM/DD 잘라줘야 함
  const year = dateStr.slice(2, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}/${month}/${day}`;
}

const image = document.createElement("img");
image.src = data.galWebImageUrl;

const info = document.createElement("div");
info.innerText = `
제목: ${data.galTitle}
날짜: ${formatDate(data.galCreatedtime)} 
촬영자: ${data.galPhotographer}
검색키워드: ${data.galSearchKeyword}
`; //formatDate는 문자열가공함수->변환해 계산

container.appendChild(image);
container.appendChild(info);

function goBack() { //처음으로 돌아가기 버튼-> 목록으로 돌아가기는 상태저장을 안해서 못함
  history.back();
}