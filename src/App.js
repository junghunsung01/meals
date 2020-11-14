import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./routers/Home";
import Time from "./Time";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/time" exact component={Time} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
