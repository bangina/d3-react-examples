import React, { useState, useRef, useEffect } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from "d3";

const CurvedLine = () => {
  const [lineData, setLineData] = useState([1, 5, 34, 22, 50, 100, 70, 30]);
  const lineRef = useRef();
  useEffect(() => {
    const svgLine = select(lineRef.current);
    //<<스케일 정의하기>>
    const xScale = scaleLinear() //scale? 축을 원하는 범위로 맞춰줌. 지도의 '축척'과 비슷한 개념.
      .domain([0, lineData.length - 1]) //실제 x축(x축은 index값으로 설정하였으므로 0~데이터 요소 개수)
      .range([0, 300]); //원하는 범위. 가로 300px에 꽉 차도록 0~300 설정

    const yScale = scaleLinear() //x축과 동일한 방식.
      .domain([0, 100]) //실제 데이터 최소값, 최대값
      .range([150, 0]); //y축을 상하반전 시키기 위해 [0,150]이 아닌 [150,0]으로 범위 설정

    //<<축 정의하기>>
    //axisBottom메서드 이용해 x축 정의하기.
    const xAxis = axisBottom(xScale) //인자로 '스케일'을 필요로 함.
      .ticks(lineData.length) // ticks 개수는 7개로!
      .tickFormat((index) => index + 1); //tick 숫자가 0이 아닌 1부터 시작하도록
    svgLine
      .select(".x-axis") //<g className="x-axis"/> 태그 선택
      .style("transform", "translateY(150px)") //axisBottom메서드는 디폴트로 (0,0)위치부터 축을 그리므로 CSS로 축을 아래로 내려줘야 함.
      .call(xAxis); //에 xAxis를 넣어줌.

    const yAxis = axisRight(yScale).ticks(5);
    svgLine
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index)) //(기존 : index * 50) => xScale(index)로 교체.
      .y(yScale) //(기존 : 150 - value) => yScale(value)로 교체 => 간단하게 yScale만으로도 표현가능
      .curve(curveCardinal);

    svgLine //d3.select("svg")
      .selectAll(".line") //(기존 : selectAll("path") xAxis의 path태그에 렌더링되어버림 => 분리하기 위해 클래스로 특정해줌
      .data([lineData])
      .join("path")
      .attr("class", "line") //line 클래스를 부여
      .attr("d", (value) => myLine(value)) //(value) => myLine(value) 을 간단하게 myLine으로만 표현 가능
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [lineData]);

  const addData = () => {
    setLineData(lineData.map((d) => d + 10));
  };
  const subsData = () => {
    setLineData(lineData.map((d) => d - 10));
  };
  return (
    <React.Fragment>
      <svg ref={lineRef}>
        <g className="x-axis"></g> {/* x축이 들어갈 그룹 태그를 생성해줌*/}
        <g className="y-axis"></g> {/* y축이 들어갈 그룹 태그를 생성해줌*/}
      </svg>
      <br />
      <br />
      <br />
      <br />
      <button onClick={addData}> add 10 to data </button>
      <button onClick={subsData}> subtract 10 to data </button>
    </React.Fragment>
  );
};

export default CurvedLine;
