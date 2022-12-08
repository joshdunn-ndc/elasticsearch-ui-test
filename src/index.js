import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Elasticsearch from "./pages/elasticsearch";
import "./styles.css";

ReactDOM.render(
  <BrowserRouter>
      <Switch>

      <Route exact path="/" component={Elasticsearch} />
      </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
