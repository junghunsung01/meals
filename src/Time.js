import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { server } from "./config/server.json";
import "./component/style/Time.scss";
import moment from "moment";

function Time() {
  const { school_name, school_locate, office_code, school_id } = JSON.parse(
    localStorage.getItem("getTime")
  );
  // 형변환 시키면서 localStorage에 있는 getItem에 저장된 데이터를 불러옴.
  const [status, setStatus] = useState("");
  const [meals, setMeals] = useState("", []);
  const [date, setDate] = useState(moment().format("yyyyMMDD"));
  // 기본적으로 날짜를 오늘로 초기화

  const getApi = useCallback(async () => {
    /* 모멘트 괄호 아무겂도 x 현재시간 server한테서 
    시간을 받아와서 format할때 변수를 넣어줌.*/
    const { data } = await axios.get(
      // api 불러온것에서 data 안에만 볼 수 있음.
      `${server}/meals?school_id=${school_id}&office_code=${office_code}&date=${date}`
    );
    return data;
  }, [date, office_code, school_id]);

  const TimeApi = useCallback(() => {
    getApi()
      .then((response) => {
        if (response.status === 200) {
          setMeals(response.data.meals);
          // response.status === 200은 api를 성공적으로 불러와서 사용함.
        }
      })
      .catch((Error) => {
        if (Error.response.status === 404) {
          setStatus(404);
          //에러를 setStatus에 저장해줘서 render할때 급식정보가 없다고 뛰어준다.
        }
      });
  }, [getApi]);

  const handlePlusDay = useCallback(() => {
    setDate(moment(date).add("+1", "day").format("yyyyMMDD"));
  }, [date]);

  const handleResetDay = useCallback(() => {
    setDate(moment().format("yyyyMMDD"));
    // add가 day에 -1을 + 해준다.
  }, [date]);

  const handleMinusDay = useCallback(() => {
    setDate(moment(date).add("-1", "day").format("yyyyMMDD"));
    // add가 day에 -1을 + 해준다.
  }, [date]);
  // useCallback은 함수 재사용(메모라 공간 절약)

  useEffect(() => {
    TimeApi();
    // render할때 실행한다.
  }, [setDate, date]);
  // 컴포넌트가 한번 실행될때마다 1번 실행
  // date가 바뀔때마다 render

  return (
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
  );
}

export default Time;
