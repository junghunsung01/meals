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
    console.log("asdf");
    getApi()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.status);
          setMeals(response.data.meals);
          // response.status === 200은 api를 성공적으로 불러와서 사용함.
        }
      })
      .catch((Error) => {
        if (Error.response.status === 404) {
          // console.log(Error.response.status);
          setStatus(404);
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
          {}
          {/* <Moment interval={30000}>1976-04-19T12:59-0500</Moment> */}
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
