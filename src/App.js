import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "./Redux/actions";
import { Profile } from "./components/Profile";

export default function App() {
    const [bioTrack, setBioTrack] = useState();
    const dispatch = useDispatch();

    const user = useSelector((state) => (state.user ? state.user : {}));

    useEffect(() => {
        dispatch(getUser());
    }, [bioTrack]);

    const setBio = (e) => {
        setBioTrack(e);
    };

    return (
        <BrowserRouter>
            <header>
                <a className="logout" href="/logout">
                    LOGOUT
                </a>
            </header>
            <div>hello from the app</div>
            <Profile user={user} setBio={setBio} />
        </BrowserRouter>
    );
}
