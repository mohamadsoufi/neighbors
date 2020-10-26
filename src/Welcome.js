import React from "react";
import { HashRouter, Route, BrowserRouter, Link } from "react-router-dom";
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
                    <div className="log-container">
                        {/* <img className="logo" src="/logo.png" /> */}
                        <Link to="#">
                            <p className="logo-p">NEIGHBOURS</p>
                        </Link>
                    </div>
                </header>
                <div></div>

                <Route exact path="/login" component={LoginRegister} />
                <Route exact path="/register" component={LoginRegister} />

                {/* <Route path="/reset-password" component={ResetPassword} /> */}
            </HashRouter>
        );
    }
}
