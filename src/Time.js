import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "./config/server.json";

function Time() {
  const { school_name, school_locate, office_code, school_code } = JSON.parse(
    localStorage.getItem("getTime")
  );
  // 형변환 시키면서 localStorage에 있는 getItem에 저장된 데이터를 불러옴.
  const [status, setStatus] = useState("");

  const TimeApi = () => {
    getApi()
      .then((response) => {
        if (response.status === 200) {
          // response.status === 200은 api를 성공적으로 불러와서 사용함.
        }
      })
      .catch((Error) => {
        if (Error.response.status === 404) {
          setStatus(404);
        }
      });
  };

  const getApi = async () => {
    const { data } = await axios.get(
      // api 불러온것에서 data 안에만 볼 수 있음.
      `${server}/v2/today?school_id=${school_code}&${office_code}`
    );
    return data;
  };

  useEffect(() => {
    TimeApi();
    // render할때 실행한다.
  }, []);

  return (
    <div>
      {status === 404 ? <div>급식 정보가 없습니다.</div> : <div></div>}
      <p>{school_name}</p>
      <p>{school_locate}</p>
    </div>
  );
}

export default Time;
