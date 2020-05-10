import React, { useState } from "react";
import Meals from "./Meals";
import axios from "axios";
import { server } from "../config/server.json";

// const school = document.getElementById("school");

function Home() {
  const [schoolList, setSchoolList] = useState([]);
  // 받아온 api배열을 여기다 넣어줌.

  const [name, setName] = useState("");
  //검색 상태 관리

  const requestApi = (event) => {
    event.preventDefault();
    // 새로고침 x
    getApi(name).then((response) => {
      if (response.status === 200) {
        // response.status === 200은 api를 성공적으로 불러와서 사용함.
        setSchoolList(response.data.schoolList);
      }
    });
  };

  const getApi = async (name) => {
    const { data } = await axios.get(
      // api 불러온것에서 data 안에만 볼 수 있음.
      `${server}/search-school?school_name=${name}`
    );
    //

    return data;
  };
  return (
    <Meals
      name={name}
      setName={setName}
      requestApi={requestApi}
      schoolList={schoolList}
    />
  );
}

export default Home;
