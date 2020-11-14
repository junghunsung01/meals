import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { server } from "../config/config.json";
import moment from "moment";
import TimeInfo from "../components/Time/TimeInfo";

const TimeInfoContainer = () => {
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
    <TimeInfo
      handleMinusDay={handleMinusDay}
      handleResetDay={handleResetDay}
      handlePlusDay={handlePlusDay}
      school_name={school_name}
      school_locate={school_locate}
      meals={meals}
      status={status}
    />
  );
};

export default TimeInfoContainer;
