import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import TimeInfo from "./components/Time/TimeInfo";
import SchoolSearhPage from "./pages/SchoolSearhPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SchoolSearhPage} />
        <Route path="/time" exact component={TimeInfo} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
