import React from "react";
import { withRouter } from "react-router-dom";
import "./SchoolSearch.scss";

const SchoolSearch = ({
  name,
  setName,
  requestApi,
  searchSchool,
  schoolList,
  localCode,
  history,
  setSearchDo,
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
              requestApi(e);
              setSearchDo(true);
            }}
          >
            검색
          </button>
        </div>
        <div className="SchoolSearch-div">
          {searchSchool ? (
            <div className="SchoolSearch-div-result">
              {schoolList.map((school, index) => (
                <div
                  className="SchoolSearch-div-result-button"
                  key={index}
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
            <div className="SchoolSearch-div-please">
              <span>학교를 검색해 주세요</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(SchoolSearch);
