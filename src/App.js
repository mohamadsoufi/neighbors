import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "./Redux/actions";

export default function App() {
    // const [] = useState()
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user && state.user);

    console.log("user in app:", user);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <BrowserRouter>
            <header>
                <a className="logout" href="/logout">
                    LOGOUT
                </a>
            </header>
            <div>hello from the app</div>
        </BrowserRouter>
    );
}
