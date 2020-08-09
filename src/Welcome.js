import React from "react";
// import Register from "./Register";
import { HashRouter, Route } from "react-router-dom";
import{ Register} from "./components/Register";
import{ Login} from "./components/Login";
// import ResetPassword from "./ResetPassword";


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter >
                <header>

                <img src="/logo.png"/>
                </header>
                <div>

                {/* <img className="header-img" src="/header7.jpg"/> */}
                </div>
                <div>Hello from welcome page!</div>

                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                {/* <Route path="/reset-password" component={ResetPassword} /> */}
            </HashRouter>
        );
    }
}
