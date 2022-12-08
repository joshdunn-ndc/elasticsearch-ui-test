import * as React from "react";
import { Switch } from "react-router-dom";
import Root from "./pages/root";
import Elasticsearch from "./pages/elasticsearch";
import { ApmRoute } from "@elastic/apm-rum-react";

export default function Router() {
  return (
    <div className="App">
      <Switch>
        <ApmRoute exact path="/" component={Root} />
        <ApmRoute exact path="/elasticsearch" component={Elasticsearch} />
      </Switch>
    </div>
  );
}
