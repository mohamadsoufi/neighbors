import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOtherUserProfile, getUserProfile } from "./Redux/actions";
import { Profile } from "./components/Profile";
import Offer from "./components/Offer";
import Request from "./components/Request";
import OfferProfile from "./components/OfferProfile";
import RequestProfile from "./components/RequestProfile";
import Map from "./components/Map";
import OfferProfileDetails from "./components/OfferProfileDetails";

export default function App() {
    const [bioTrack, setBioTracker] = useState();
    const [tracker, setTracker] = useState();
    const dispatch = useDispatch();

    // const user = useSelector((state) => (state.user ? state.user : {}));
    const user = useSelector((state) =>
        state.userProfile ? state.userProfile : {}
    );
    useEffect(() => {
        dispatch(getUserProfile());
    }, [bioTrack, tracker]);
    let { id, first, last, email, profile_pic: imgUrl } = user;

    const setBio = (newBio) => {
        setBioTracker(newBio);
    };
    console.log("imgUrl in app :", imgUrl);
    const updateUrl = (newUrl) => {
        setTracker(newUrl);
    };

    return (
        <BrowserRouter>
            <header>
                <div className="header-nav-container">
                    <div>
                        <Link className="logo" to="/">
                            <h2>NEIGHBOURS</h2>
                        </Link>
                    </div>
                    <div className="header-right">
                        <Link to="/">Profile</Link>
                        <Link to="/map">
                            <img className="pin-icon" src="/pin-icon.png" />
                            Find Neighbours
                        </Link>
                        <a className="logout" href="/logout">
                            Logout
                        </a>

                        {imgUrl && (
                            <img
                                className="profile-pic-header"
                                src={imgUrl}
                                alt={first}
                            />
                        )}
                    </div>
                </div>
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

            <Route exact path="/offer" component={Offer} />
            {/* <Route path="/user/:id" component={OtherProfile} /> */}
            <Route exact path="/request" component={Request} />
            <Route exact path="/request-profile" component={RequestProfile} />
            {/* <Route path="/offer-profile" render={() => <OfferProfile />} /> */}
            <Route path="/offers/:id" component={OfferProfile} />
            <Route path="/offer-detail/:id" component={OfferProfileDetails} />
            <Route exact path="/map" render={() => <Map />} />
        </BrowserRouter>
    );
}
