import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOtherUserProfile, getRequests } from "../Redux/actions";

export default function RequestProfile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOtherUserProfile());
        dispatch(getRequests());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));
    const requests = useSelector(
        (state) =>
            state.requests &&
            state.requests.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            )
    );

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";

    const showRequests = (
        <div>
            {requests &&
                requests.map((request, i) => {
                    let time = new Date(request.created_at);
                    let {
                        id,
                        location,
                        date,
                        quantity,
                        halal,
                        kosher,
                        vegan,
                        vegetarian,
                        glutenFree,
                    } = request;
                    return (
                        <div key={i} className="user-content-container">
                            {/* <Link to={`/user/${id}`}>
                                <img
                                    className="profile-pic-small"
                                    src={picChecker(profile_pic)}
                                    alt={first}
                                />
                            </Link> */}
                            <div className="request">
                                <p>
                                    made on{" "}
                                    {time.toLocaleDateString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <p>cook date: {date}</p>
                                <p>quantity: {quantity}</p>
                                <p>location: {location}</p>
                                <h4>Food dietary</h4>
                                {halal && <p>halal</p>}
                                {kosher && <p>kosher</p>}
                                {vegan && <p>vegan</p>}
                                {vegetarian && <p>vegetarian</p>}
                                {glutenFree && <p>glutenFree</p>}
                            </div>
                        </div>
                    );
                })}
        </div>
    );

    return (
        <div>
            <div className="profile-content-container">
                <div className="profile-username">
                    <p>
                        {first} {last}
                    </p>
                </div>
                {bio && <h2 className="bio-text-container">{bio}</h2>}
                <div className="profile-right-side">
                    <img className="profile-pic" src={imgUrl} alt={first} />
                </div>
                <div className="requests-list">
                    <h2>requests List:</h2>
                    {showRequests && showRequests}
                </div>
            </div>
        </div>
    );
}
