const baseURL = "https://apis.data.go.kr/B551011/PhotoGalleryService1"; //한국관광공사 사진갤러리 api의 기본 주소

//api에 데이터를 요청할 때 필요한 세부 조건 파라키터들을 모아둔 객체
const option = {
  serviceKey:
    "154813c115671706cca4de9d1f507744d5ca19c4b6d52a129fe272409c084329", //인증키
  numofRows: 6, //한번에 불러올 사진 개수
  MobileApp: "test", //어플리케이션 이름
  MobileOS: "ETC",//os구분
  arrange: "A",//정렬기준 (A=제목순 등)
  _type: "json",//응답데이터타입
};

const container = document.getElementById("container"); //html에서 id가 container인 요소를 찾아 변수에 저징 ->앞으로 불러오는 사진들이 이 공간에 채워짐

let photoIndex = 1; //사진의 순번을 매기기 위해 사용하는 숫자 변수->초기값1로선언

let pageNo = 1; // 기본 1페이지로 설정 (원래 option이었지만 option은 고정 설정값 묶음이기에 변하는 값으로 따로 관리 ), let의 속성때문에 async위에 선언함

  const btn = document.getElementById("loadBtn");

  function loadHere() {
  pageNo++;   // 페이지 번호를 증가시켜 새로운 이미지를 불러옴
  getData();
  }

async function getData(){ //async로 비동기함수 선언->api 서버에서 데이터들을 가져오는 시간이 걸리는 작업들을 순차적으로 처리함
  let count = 1;

  const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${pageNo}&serviceKey=${option.serviceKey}` 
  //baseURL과 option객체들의 값을 조합하여, 최종적으로 데이터를 요청할 주소를 만듦

  const fetchData = await fetch(url); //미리 선언하고 가져다씀, 해당 url로 네트워크 요청을 보내 데이터를 가져옴
  const toJSON = await fetchData.json(); //해체해서 저장함
  const datas = await toJSON.response.body.items.item;

  datas.forEach((data, i) => {
    const list = document.createElement("div"); //list가 뼈대 역할
    list.id = "list";//위에서 만든 <div>에 id="list"라는 이름표 붙임

    const image = document.createElement("img");
    image.src = data.galWebImageUrl; //js가 image라는 변수로 만든 img태그의 주소 src값으로 api에서 기져온 진짜 이미지 url을 ...

    const info = document.createElement("span");
    info.innerText = `
    ${photoIndex++}번째 사진
    제목: ${data.galTitle} 
    장소: ${data.galPhotographyLocation}`
    //gal은 갤러리 줄임말? api 명세서에 의함
    
    list.appendChild(image);
    list.appendChild(info);
    container.appendChild(list); //html에 만들어놓은 컨테이너 연결
  
    const btn = document.createElement("button"); //더보기 버튼 추가-> 사진마다 생기기 때문에 동적!->html이 아닌 js에 생성
    btn.innerText = "더보기";

    btn.onclick = () => {
    localStorage.setItem("photoData", JSON.stringify(data)); // 데이터 저장
    location.href = "detail.html"; // 페이지 이동
    };

    list.appendChild(btn);
  });
}
