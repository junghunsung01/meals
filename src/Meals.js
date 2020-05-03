import React from "react";
import "./Meals.css";

function Meals({ name, setName, requestApi, schoolList }) {
  console.log(schoolList);
  return (
    <div>
      <form onSubmit={requestApi}>
        <input
          type="text"
          placeholder="학교를 입력하세요"
          className="input_school"
          value={name}
          // 이름 넘겨주기
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">검색</button>
        <h3 className="h3"> </h3>
      </form>
    </div>
  );
}

export default Meals;
