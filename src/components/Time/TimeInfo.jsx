import React from "react";
import PropTypes from "prop-types";
import "./Time.scss";

const TimeInfo = ({
  handleMinusDay,
  handleResetDay,
  handlePlusDay,
  school_name,
  school_locate,
  meals,
  status,
}) => {
  return (
    <>
      <div className="Time">
        <div className="Time_button">
          <div
            className="Time_button_yesterday"
            onClick={() => {
              handleMinusDay();
            }}
          >
            어제
          </div>
          <div
            className="Time_button_today"
            onClick={() => {
              handleResetDay();
            }}
          >
            오늘
          </div>

          <div
            className="Time_button_tomorrow"
            onClick={() => {
              handlePlusDay();
            }}
          >
            내일
          </div>
        </div>
        {status === 404 ? (
          <div>급식 정보가 없습니다.</div>
        ) : (
          <div className="Time_">
            <div className="Time_schoolName">
              <p>{school_name}</p>
            </div>
            <div className="Time_locate">
              <p>{school_locate}</p>
            </div>

            <div className="Time_information">
              <div className="Time_information_breakfast">
                <div className="Time_information_breakfast_text">
                  <span>아침</span>
                </div>
                <div className="Time_information_breakfast_impormation">
                  {meals[0] &&
                    meals[0].split("<br/>").map((meal) => <div>{meal}</div>)}
                  {/* &연산자를 써주는 이유는 서버에 값이 받아올때까지 기다려주는것(필요없는 연산을 이용하여서
                    서버에서 응답을 기다림) */}
                </div>
              </div>

              <div className="Time_information_lunch">
                <div className="Time_information_lunch_text">
                  <span>점심</span>
                </div>
                <div className="Time_information_lunch_importmation">
                  {meals[1] &&
                    meals[1].split("<br/>").map((meal) => <div>{meal}</div>)}
                </div>
              </div>

              <div className="Time_information_dinner">
                <div className="Time_information_dinner_text">
                  <span>저녁</span>
                </div>
                <div className="Time_information_dinner_impormation">
                  {meals[2] &&
                    meals[2].split("<br/>").map((meal) => <div>{meal}</div>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

TimeInfo.propTypes = {};

export default TimeInfo;
