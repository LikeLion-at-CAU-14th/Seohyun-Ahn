//버튼js에서 양식 복붙

const 프로필카드 = (props) => {
  console.log("카드가 받은 props: ", props)

  return(
    <div>
      <h3>{props.이름}</h3>
      <p>나이: {props.나이}</p>
      <p>역할: {props.역할}</p>
    </div>
  )
}