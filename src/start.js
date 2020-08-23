import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./Redux/reducer";
import { init } from "./components/socket";

import Welcome from "./Welcome.js";
import App from "./App.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
let isLoggedIn = location.pathname != "/welcome";

if (isLoggedIn) {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    init(store);
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
