import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([5, 20, 25, 30, 40]);

  useEffect(() => {
    const svg = select(svgRef.current); //d3.select = svg
    svg
      .selectAll("circle") //D3야, circle 태그들 모두 찾아서 선택해줘
      .data(data) //그리고 데이터와 바인딩(싱크로나이즈) 해줘
      .join(//join: svg요소를 '신규생성' / '업데이트' / '지우기' 해야 할 경우 한꺼번에 관리
        (enter) => enter.append("circle"), //circle이 없으면 신규 생성
        (update) => update.attr("class", "updated"), //이미 있으면 업데이트(updated 클래스 추가)
        (exit) => exit.remove() //남는 circle은 지우기
      )
      // .join("circle") //간단하게 circle 생성만 하는 경우엔 이렇게 작성해도 됩니다.
      .attr("r", (value) => value) //생성한 circle한테 이런 속성들 좀 추가해줘
      .attr("cx", (value) => value * 2)//(r: 반지름, cx: 중심점 x좌표값, cy: 중심점 y좌표값)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]); //dependency array인 data가 바뀔때마다 안의 함수 실행되도록 useEffect Hook 사용

  const increaseData = () => {
    setData(data.map((value) => value + 5));
  };
  const decreaseData = () => {
    setData(data.map((value) => value - 5));
  };

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <circle />
      </svg>
      <button onClick={increaseData}>+5</button>
      <button onClick={decreaseData}>-5</button>
    </React.Fragment>
  );
}

export default App;
