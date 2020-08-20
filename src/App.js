import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "./Redux/actions";
import { Profile } from "./components/Profile";
import Offer from "./components/Offer";
import Request from "./components/Request";
import OfferProfile from "./components/OfferProfile";
import RequestProfile from "./components/RequestProfile";
import Map from "./components/Map";

export default function App() {
    const [bioTrack, setBioTracker] = useState();
    const [tracker, setTracker] = useState();
    const dispatch = useDispatch();

    const user = useSelector((state) => (state.user ? state.user : {}));
    useEffect(() => {
        dispatch(getUser());
    }, [bioTrack, tracker]);

    const setBio = (newBio) => {
        setBioTracker(newBio);
    };

    const updateUrl = (newUrl) => {
        setTracker(newUrl);
    };

    return (
        <BrowserRouter>
            <header>
                <a className="logout" href="/logout">
                    LOGOUT
                </a>

                <Link to="/">Profile</Link>
            </header>
            <Route
                exact
                path="/"
                render={() => (
                    <Profile
                        user={user}
                        setBio={setBio}
                        updateUrl={updateUrl}
                    />
                )}
            />
            <Route
                exact
                path="/offer"
                render={(props) => <Offer {...props} />}
            />
            <Route exact path="/request" component={Request} />
            <Route exact path="/request-profile" component={RequestProfile} />
            <Route path="/offer-profile" render={() => <OfferProfile />} />
            <Route exact path="/map" render={() => <Map />} />
        </BrowserRouter>
    );
}
