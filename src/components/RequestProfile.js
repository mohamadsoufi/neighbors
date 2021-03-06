import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getOtherUserProfile,
    getUserRequestProfile,
    getUserProfile,
} from "../Redux/actions";

export default function RequestProfile(props) {
    const dispatch = useDispatch();

    const user = useSelector((state) => (state.user ? state.user : {}));
    const requests = useSelector(
        (state) =>
            state.UserRequests &&
            state.UserRequests.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
    );
    useEffect(() => {
        const { id } = props.match.params;

        dispatch(getOtherUserProfile(id));
        dispatch(getUserRequestProfile(id));
        dispatch(getUserProfile());
    }, []);

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";

    const currentUser = useSelector((state) =>
        state.userProfile ? state.userProfile : {}
    );
    let currentUserId;
    if (currentUser) {
        currentUserId = currentUser.id;
    }
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
                            <div className="request">
                                <p>
                                    made on{" "}
                                    {time.toLocaleDateString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>

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
    const { id } = props.match.params;

    return (
        <div>
            <div className="profile-content-container">
                <div className="profile-left-side">
                    <div className="profile-username">
                        <h1>Profile</h1>
                        <p>
                            {first} {last}
                        </p>
                    </div>
                    {bio && <h2 className="bio-text-container">{bio}</h2>}

                    <div className="profile-right-side">
                        <img className="profile-pic" src={imgUrl} alt={first} />
                    </div>
                </div>
                <div className="requests-list">
                    <h2>request :</h2>
                    {showRequests && showRequests}
                </div>
                {user && id != currentUserId && (
                    <div className="chat-icon-container">
                        <Link to="/chat">
                            <img className="chat-icon" src="/talk.png" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
