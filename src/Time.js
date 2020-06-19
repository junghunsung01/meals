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

  const TimeApi = () => {
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
  };

  const handlePrevDate = useCallback(() => {
    setDate(moment(date).add("-1", "day").format("yyyyMMDD"));
    // add가 day에 -1을 + 해준다.
  }, [date]);

  const getApi = async () => {
    /* 모멘트 괄호 아무겂도 x 현재시간 server한테서 
    시간을 받아와서 format할때 변수를 넣어줌.*/
    const { data } = await axios.get(
      // api 불러온것에서 data 안에만 볼 수 있음.
      `${server}/meals?school_id=${school_id}&office_code=${office_code}&date=${date}`
    );
    console.log(data.data.meals);
    return data;
  };

  useEffect(() => {
    TimeApi();
    // render할때 실행한다.
  }, []);

  return (
    <div>
      <button onClick={() => {}}>어제</button>

      <button onClick={() => {}}>오늘</button>

      <button onClick={() => {}}>내일</button>
      {status === 404 ? (
        <div>급식 정보가 없습니다.</div>
      ) : (
        <div className="meals">
          {}
          {/* <Moment interval={30000}>1976-04-19T12:59-0500</Moment> */}
          <div className="meals_schoolName">
            <p>{school_name}</p>
          </div>
          <div className="meals_locate">
            <p>{school_locate}</p>
          </div>
          <div className="meals_breakfast">
            <div className="meals_breakfast_text">
              <span>아침</span>
            </div>
            <div className="meals_breakfast_importmation">
              {meals[0] &&
                meals[0].split("<br/>").map((meal) => <div>{meal}</div>)}
            </div>
          </div>
          <div className="meals_lunch">
            <div className="meals_lunch_text">
              <span>점심</span>
            </div>
            <div className="meals_lunch_importmation">
              <div className="meals_breakfast_importmation">
                {meals[1] &&
                  meals[1].split("<br/>").map((meal) => <div>{meal}</div>)}
              </div>
            </div>
            <div className="meals_dinner">
              <div className="meals_dinner_text">
                <span>저녁</span>
              </div>
              <div className="meals_dinner_importmation">
                <div className="meals_breakfast_importmation">
                  {meals[2] &&
                    meals[2].split("<br/>").map((meal) => <div>{meal}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Time;
