import React, { useState } from "react";
function Time() {
  const data = JSON.parse(localStorage.getItem("getTime"));
  const { school_code, office_code } = data;
  console.log(school_code);
}

export default Time;
