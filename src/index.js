import React from "react";
import {Render} from "jumpsuit";
import App from "./App";
import {algorithms, animation, simulation} from "./state";

const globalState = {
  algorithms: algorithms,
  animation: animation,
  simulation: simulation,
};

Render(globalState, <App/>, 'root');
