import React from "react";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
let isLoggedIn = location.pathname != "/welcome";
import { LoginRegister } from "./components/LoginRegister";
// import ResetPassword from "./ResetPassword";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter>
                <header>
                    <img src="/logo.png" />
                </header>
                <div></div>
                <div>Hello from welcome page!</div>

                <Route exact path="/login" component={LoginRegister} />
                <Route exact path="/register" component={LoginRegister} />

                {/* <Route path="/reset-password" component={ResetPassword} /> */}
            </HashRouter>
        );
    }
}
