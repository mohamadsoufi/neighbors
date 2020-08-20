import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, getOffers } from "../Redux/actions";

export default function OfferProfile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        dispatch(getOffers());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));
    const offers = useSelector(
        (state) =>
            state.offers &&
            state.offers.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            )
    );

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";

    const showOffers = (
        <div>
            {offers &&
                offers.map((offer, i) => {
                    let time = new Date(offer.created_at);
                    let {
                        id,
                        date,
                        location,
                        meal,
                        quantity,
                        halal,
                        kosher,
                        vegan,
                        vegetarian,
                        glutenFree,
                    } = offer;
                    return (
                        <div key={i} className="user-content-container">
                            {/* <Link to={`/user/${id}`}>
                                <img
                                    className="profile-pic-small"
                                    src={picChecker(profile_pic)}
                                    alt={first}
                                />
                            </Link> */}
                            <div className="offer">
                                <p>location: {location}</p>
                                <p>
                                    made on{" "}
                                    {time.toLocaleDateString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <p>cook date: {date}</p>
                                <p>meal: {meal}</p>
                                <p>quantity: {quantity}</p>

                                <h4>Food dietary</h4>
                                <p>{halal}</p>
                                <p>{kosher}</p>
                                <p>{vegan}</p>
                                <p>{vegetarian}</p>
                                <p>{glutenFree}</p>
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
                <p>offer profile!!!!</p>
                <div className="offers-list">
                    <h2>Offers List:</h2>
                    {showOffers && showOffers}
                </div>
            </div>
        </div>
    );
}
