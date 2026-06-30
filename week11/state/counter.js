// const 하위, 상위 등 같은 구조로 이루어짐 알 수 있음

const 하위페이지_일반 = () => {

    let 카운트 = 0  // 일반 변수: React가 변화를 감지하지 못함

    const 올리기 = () => {
        카운트 = 카운트 + 1
        console.log("[일반변수] 카운트 변경됨:", 카운트)
        // 값은 바뀌지만... 화면은 안 바뀜! React가 재렌더링하지 않기 때문
    }

    const 내리기 = () => {
        카운트 = 카운트 - 1
        console.log("[일반변수] 카운트 변경됨:", 카운트)
    }

    return (
        <div style={{ border: "1px dashed #aaa", padding: "12px", marginTop: "8px", borderRadius: "6px" }}>
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>📍 하위 페이지</p>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>카운트: {카운트}</div>
            <button onClick={올리기} style={{ marginRight: "4px" }}>올리기 ▲</button>
            <button onClick={내리기}>내리기 ▼</button>
            <p style={{ color: "crimson", fontSize: "12px", marginTop: "8px" }}>※ 버튼 눌러도 화면 안 바뀜 (Console 탭 확인)</p>
        </div>
    )
}
const 상위페이지_일반 = () => {
    return (
        <div style={{ border: "2px solid tomato", padding: "16px", borderRadius: "8px", flex: 1 }}>
            <h2 style={{ color: "tomato", marginTop: 0 }}>❌ 일반 변수 (state 미사용)</h2>
            <p>상위에서 보이는 카운트: <strong>???</strong></p>
            {/* 하위의 변수값을 상위에서 알 방법이 없음 */}
            <하위페이지_일반 />
        </div>
    )
}

// 하위 컴포넌트: 버튼만 있고, state는 직접 갖지 않음
const 하위페이지_state = ({ 카운트, 카운트올리기, 카운트내리기 }) => {
    /*
    핵심: 이 컴포넌트는 state 없이 props만 받음
    - 카운트 값: 상위에서 props로 받음
    - 올리기/내리기 함수: 상위에서 props로 받음
    → 버튼을 누르면 상위의 state가 바뀜
    → 상위가 재렌더링됨
    → 여기도 새로운 props를 받아서 다시 렌더링됨
    */
    return (
        <div style={{ border: "1px dashed #aaa", padding: "12px", marginTop: "8px", borderRadius: "6px" }}>
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>📍 하위 페이지</p>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>카운트: {카운트}</div>
            <button onClick={카운트올리기} style={{ marginRight: "4px" }}>올리기 ▲</button>
            <button onClick={카운트내리기}>내리기 ▼</button>
            <p style={{ color: "green", fontSize: "12px", marginTop: "8px" }}>※ 버튼 누르면 화면 바뀜 + 상위도 연동!</p>
        </div>
    )
}
const 상위페이지_state = () => {

    // state를 상위에 두면 → 상위와 하위 모두 이 값을 공유 가능
    const [카운트, 카운트바꾸기] = React.useState(0) //cf. props 폴더 실습처럼 앞에 React 생략가능

    return (
        <div style={{ border: "2px solid royalblue", padding: "16px", borderRadius: "8px", flex: 1 }}>
            <h2 style={{ color: "royalblue", marginTop: 0 }}>✅ useState 사용 (State Lifting)</h2>
            <p>상위에서 보이는 카운트: <strong style={{ fontSize: "20px" }}>{카운트}</strong></p>
            {/* 하위에서 버튼 누르면 여기도 바뀜! */}
            <하위페이지_state
                카운트={카운트}
                카운트올리기={() => 카운트바꾸기(카운트 + 1)}
                카운트내리기={() => 카운트바꾸기(카운트 - 1)}
            />
        </div>
    )
}

const 카운터 = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>State vs 일반 변수 비교</h1>
            <div style={{ display: "flex", gap: "20px" }}>
                <상위페이지_일반 />
                <상위페이지_state />
            </div>
        </div>
    )
}