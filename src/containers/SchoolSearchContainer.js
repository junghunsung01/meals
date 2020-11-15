import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../config/config.json";
import SchoolSearch from "../components/SchoolSearch";

let all = [];
let addSchoolList = {};

const SchoolSearchContainer = () => {
  const [schoolList, setSchoolList] = useState([]);
  const [name, setName] = useState("");
  const [searchSchool, setSearchSchool] = useState(false);
  const [searchDo, setSearchDo] = useState(false);

  const getApi = async (name) => {
    const { data } = await axios.get(`${server}/search?school_name=${name}`);
    return data;
  };

  const requestApi = (event) => {
    event.preventDefault();
    getApi(name).then((response) => {
      if (response.status === 200) {
        if (searchDo === true) {
          setSchoolList([]);
          all = [];
          addSchoolList = {};
        }
        setSchoolList(response.data.schools);
        console.log(response.data.schools);
        setSearchSchool(true);
      } else {
        setSearchSchool(false);
      }
    });
  };

  const localCode = (data) => {
    console.log(data);
    localStorage.setItem("getTime", JSON.stringify(data));
  };

  return (
    <SchoolSearch
      name={name}
      setName={setName}
      requestApi={requestApi}
      searchSchool={searchSchool}
      schoolList={schoolList}
      localCode={localCode}
      setSearchDo={setSearchDo}
    />
  );
};

export default SchoolSearchContainer;
