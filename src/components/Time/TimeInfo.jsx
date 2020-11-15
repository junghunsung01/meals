import React from "react";
import PropTypes from "prop-types";
import "./Time.scss";

const TimeInfo = ({
  handleMinusDay,
  handleResetDay,
  handlePlusDay,
  school_name,
  meals,
  status,
  reSearch,
}) => {
  return (
    <div className="center">
      <div className="Time">
        <span className="schoolName">{school_name}</span>
        <div className="Time-button">
          <div
            className="Time-button-yesterday button"
            onClick={() => {
              handleMinusDay();
            }}
          >
            어제
          </div>
          <div
            className="Time-button-today button"
            onClick={() => {
              handleResetDay();
            }}
          >
            오늘
          </div>

          <div
            className="Time-button-tomorrow button"
            onClick={() => {
              handlePlusDay();
            }}
          >
            내일
          </div>
        </div>
        <div className="Time-info">
          {status === 404 ? (
            <div>급식 정보가 없습니다.</div>
          ) : (
            <div className="Time-info-information">
              <div className="Time-info-information_breakfast">
                <div className="Time-info-information_breakfast_text">
                  <span>아침</span>
                </div>
                <div className="Time-info-information_breakfast impormation">
                  {meals[0] &&
                    meals[0].split("<br/>").map((meal) => <div>{meal}</div>)}
                  {/* &연산자를 써주는 이유는 서버에 값이 받아올때까지 기다려주는것(필요없는 연산을 이용하여서
                    서버에서 응답을 기다림) */}
                </div>
              </div>

              <div className="Time-info-information_lunch">
                <div className="Time-info-information_lunch_text">
                  <span>점심</span>
                </div>
                <div className="Time-info-information_lunch impormation">
                  {meals[1] &&
                    meals[1].split("<br/>").map((meal) => <div>{meal}</div>)}
                </div>
              </div>

              <div className="Time-info-information_dinner">
                <div className="Time-info-information_dinner_text">
                  <span>저녁</span>
                </div>
                <div className="Time-info-information_dinner impormation">
                  {meals[2] &&
                    meals[2].split("<br/>").map((meal) => <div>{meal}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="Time-againSearch">
          <div className="Time-againSearch-Button" onClick={() => reSearch()}>
            학교 검색하기
          </div>
        </div>
      </div>
    </div>
  );
};

TimeInfo.propTypes = {};

export default TimeInfo;
