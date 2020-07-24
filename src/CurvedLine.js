import React, { useState, useRef, useEffect } from "react";
import { select, line, curveCardinal } from "d3";

const CurvedLine = () => {
  const [lineData, setLineData] = useState([1, 5, 34, 22, 50, 100, 70, 30]);
  const lineRef = useRef();
  useEffect(() => {
    const svgLine = select(lineRef.current); //d3.select("svg")
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value) //y좌표값 아래부터 시작하도록 조정
      .curve(curveCardinal); //그래프 스타일. 점과 점 곡선으로 연결되도록

    svgLine
      .selectAll("path") //path태그 선택해서
      .data([lineData]) //데이터와 바인딩
      .join("path") //enter, update, exit통합.
      .attr("d", (value) => myLine(value)) //좌표값 속성인 d-> 콜백함수로 위에 라인 메서드에 데이터값 전체를 대입
      .attr("fill", "none") // 채우기 없음
      .attr("stroke", "blue"); // 선색상 파란색
  }, [lineData]);
  const addData = () => {
    setLineData(lineData.map((d) => d + 10));
  };
  const subsData = () => {
    setLineData(lineData.map((d) => d - 10));
  };
  return (
    <React.Fragment>
      <svg ref={lineRef}></svg>
      <br />
      <br />
      <br />
      <br />
      <button onClick={addData}>add 10 to data</button>
      <button onClick={subsData}>subtract 10 to data</button>
    </React.Fragment>
  );
};

export default CurvedLine;
