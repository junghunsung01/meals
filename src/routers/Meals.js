import React from "react";
import "./Meals.css";
import { withRouter } from "react-router-dom";

function Meals({ name, setName, requestApi, schoolList, history }) {
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
      </form>
      {schoolList.map((school) => {
        const {
          school_name,
          school_type,
          school_locate,
          school_code,
          office_code,
        } = school;
        const data = {
          school_name,
          school_type,
          school_locate,
          school_code,
          office_code,
        };
        return (
          <button
            key={school_code}
            className="schoolButton"
            onClick={() => {
              localCode(data);
              history.push("/time");
              // 버튼 클릭시 /time으로 보내준다.
            }}
          >
            <p>{school_name}</p>
            <p>{school_type}</p>
            <p>{school_locate}</p>
          </button>
        );
      })}
    </div>
  );
}

function localCode(data) {
  localStorage.setItem("getTime", JSON.stringify(data));
}

export default withRouter(Meals);
