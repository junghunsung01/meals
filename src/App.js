import React, { useState } from "react";
import Meals from "./Meals";
import axios from "axios";

// const school = document.getElementById("school");

function App() {
  const [schoolList, setSchoolList] = useState([]);
  // 받아온 api배열을 여기다 넣어줌.

  const [name, setName] = useState("");
  //
  const requestApi = (event) => {
    event.preventDefault();
    getApi(name).then((response) => {
      if (response.status === 200) {
        // response.status === 200은 api를 성공적으로 불러와서 사용함.
        setSchoolList(response.data.schoolList);
        console.log(schoolList);
      }
    });
  };

  const getApi = async (name) => {
    const { data } = await axios.get(
      `http://ec2-52-79-226-248.ap-northeast-2.compute.amazonaws.com:3000/search-school?school_name=${name}`
    );
    console.log(data);
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

export default App;
