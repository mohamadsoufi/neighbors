import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./Welcome.js";
import App from "./App.js";

let elem;
let isLoggedIn = location.pathname != "/welcome";

if (isLoggedIn) {
    elem = <App />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));