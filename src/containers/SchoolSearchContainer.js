import React, { useState } from "react";
import axios from "axios";
import { server } from "../config/config.json";
import SchoolSearch from "../components/SchoolSearch";

let all = [];

const SchoolSearchContainer = () => {
  const [schoolList, setSchoolList] = useState([]);
  const [name, setName] = useState("");
  const [searchSchool, setSearchSchool] = useState(false);

  const searchClick = (e) => {
    setSearchSchool(true);
    requestApi(e);
  };

  const requestApi = (event) => {
    event.preventDefault();
    getApi(name).then((response) => {
      if (response.status === 200) {
        schoolSet(response.data.schools);
      }
    });
  };

  const schoolSet = (school) => {
    for (let i = 0; i < school.length; i++) {
      const data = {
        key: i,
        school_name: school[i].school_name,
        school_locate: school[i].school_locate,
        school_id: school[i].school_id,
        office_code: school[i].office_code,
      };
      all = [...all, data];
      setSchoolList(all);
    }
  };
  console.log(schoolList);

  const getApi = async (name) => {
    const { data } = await axios.get(`${server}/search?school_name=${name}`);
    return data;
  };

  const localCode = (data) => {
    console.log(data);
    localStorage.setItem("getTime", JSON.stringify(data));
  };

  return (
    <SchoolSearch
      name={name}
      setName={setName}
      searchClick={searchClick}
      searchSchool={searchSchool}
      schoolList={schoolList}
      localCode={localCode}
    />
  );
};

export default SchoolSearchContainer;
