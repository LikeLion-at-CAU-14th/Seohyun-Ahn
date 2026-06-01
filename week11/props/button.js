//가독성을 위해 실습때 한글로 적음

const 재사용버튼 = (props) => {
  console.log("버튼이 받은 props: ", props)

  return(
    <button style={{backgroundColor: props.배경색, color: "white", padding: "8px 16px"
      , margin: "4px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px" }}>
      {props.라벨}
    </button>
  )
}
//props를 정건파라미터로 생각하면 쉬움 (내가 정할 수 있는 단어)