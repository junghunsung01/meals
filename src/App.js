import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import TimeInfoContainer from "./containers/TimeInfoContainer";
import SchoolSearhPage from "./pages/SchoolSearhPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SchoolSearhPage} />
        <Route path="/time" exact component={TimeInfoContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
