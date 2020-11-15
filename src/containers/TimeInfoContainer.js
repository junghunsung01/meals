import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { server } from "../config/config.json";
import moment from "moment";
import TimeInfo from "../components/Time/TimeInfo";
import { withRouter } from "react-router-dom";

const TimeInfoContainer = ({ history }) => {
  const [status, setStatus] = useState("");
  const [meals, setMeals] = useState("", []);
  const [date, setDate] = useState(moment().format("yyyyMMDD"));

  const { school_name, school_locate, office_code, school_id } = JSON.parse(
    localStorage.getItem("getTime")
  );

  const getApi = useCallback(async () => {
    const { data } = await axios.get(
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

  const reSearch = () => {
    localStorage.clear();
    history.push("/");
  };

  const handlePlusDay = useCallback(() => {
    console.log("내일");
    setDate(moment(date).add("+1", "day").format("yyyyMMDD"));
  }, [date]);

  const handleResetDay = useCallback(() => {
    console.log("오늘");
    setDate(moment().format("yyyyMMDD"));
    // add가 day에 -1을 + 해준다.
  }, [date]);

  const handleMinusDay = useCallback(() => {
    console.log("어제");
    setDate(moment(date).add("-1", "day").format("yyyyMMDD"));
  }, [date]);

  useEffect(() => {
    TimeApi();
  }, [setDate, date]);

  return (
    <TimeInfo
      handleMinusDay={handleMinusDay}
      handleResetDay={handleResetDay}
      handlePlusDay={handlePlusDay}
      school_name={school_name}
      meals={meals}
      status={status}
      reSearch={reSearch}
    />
  );
};

export default withRouter(TimeInfoContainer);
