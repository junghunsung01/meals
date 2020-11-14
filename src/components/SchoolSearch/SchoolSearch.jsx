import React from "react";
import { withRouter } from "react-router-dom";
import "./SchoolSearch.scss";

const SchoolSearch = ({
  name,
  setName,
  searchClick,
  searchSchool,
  schoolList,
  localCode,
  history,
}) => {
  return (
    <div className="center">
      <div className="SchoolSearch">
        <div className="SchoolSearch-Searching">
          <input
            type="text"
            placeholder="학교를 입력하세요"
            className="SchoolSearch-Searching-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            className="SchoolSearch-Searching-button"
            type="submit"
            onClick={(e) => {
              searchClick(e);
            }}
          >
            검색
          </button>
        </div>
        <div className="SchoolSearch-div">
          {searchSchool ? (
            <div className="SchoolSearch-div-result">
              {schoolList.map((school) => (
                <div
                  className="SchoolSearch-div-result-button"
                  key={school.key}
                  onClick={() => {
                    localCode(school);
                    history.push("/time");
                  }}
                >
                  <span>{school.school_name}</span>
                  <span>{school.school_locate}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="SchoolSearch-div-please">
              학교를 검색해 주세요
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// loaclstorage에 getTime이라는 이름으로 data를 json형으로 저장

export default withRouter(SchoolSearch);
