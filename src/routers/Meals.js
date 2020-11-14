import React from "react";
import "./Meals.css";
import { withRouter } from "react-router-dom";

function Meals({ name, setName, requestApi, schoolList, history }) {
  return (
    <div>
      <form onSubmit={requestApi}>
        {/* onSubmit이 값 넘겨주기  */}
        <input
          type="text"
          placeholder="학교를 입력하세요"
          className="input_school"
          value={name}
          // 이름 넘겨주기
          onChange={(event) => setName(event.target.value)}
          // input에 있는값 setName으로 넘겨주기
        />
        <button type="submit">검색</button>
        {/* 버튼을 누르면 폼이 제출됨.*/}
      </form>
      {schoolList.map((school) => {
        const { school_name, school_locate, school_id, office_code } = school;
        // 비구조화 할당
        const data = {
          school_name,
          school_locate,
          school_id,
          office_code,
        };
        return (
          <button
            key={school_id}
            className="schoolButton"
            onClick={() => {
              localCode(data);
              history.push("/time");
              // 버튼 클릭시 /time으로 보내준다.
            }}
          >
            <p>{school_name}</p>
            <p>{school_locate}</p>
          </button>
        );
      })}
    </div>
  );
}

function localCode(data) {
  console.log(data);
  localStorage.setItem("getTime", JSON.stringify(data));
}
// loaclstorage에 getTime이라는 이름으로 data를 json형으로 저장

export default withRouter(Meals);
