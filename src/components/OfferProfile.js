import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateOffer } from "../Redux/actions";

export default function OfferProfile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        // dispatch(getOffer());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));
    const offer = useSelector((state) => (state.offer ? state.offer : []));

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    console.log("offer in offer profile :", offer);
    imgUrl = imgUrl || "../user.png";

    return (
        <div>
            <div className="profile-content-container">
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
                <p>offer profile!!!!</p>
                {/* {offer &&
                    offer.map((offer) => {
                        <div>
                            <p>{offer.meal}</p>
                        </div>;
                    })} */}
            </div>
        </div>
    );
}
