import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getOtherUserProfile,
    getOffers,
    getUserOfferProfile,
} from "../Redux/actions";

export default function OfferProfile(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = props.match.params;

        dispatch(getOtherUserProfile(id));
        dispatch(getUserOfferProfile(id));
        dispatch(getOffers());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));
    const offers = useSelector(
        (state) =>
            state.UserOffers &&
            state.UserOffers.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
    );

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";

    const showOffers = (
        <div>
            {offers &&
                offers.map((offer, i) => {
                    let time = new Date(offer.created_at);
                    let { id, meal } = offer;
                    return (
                        <div key={i} className="user-content-container">
                            <div className="offer">
                                <Link to={`/offer-detail/${id}`}>{meal}</Link>
                                {/* <p>location: {location}</p>
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
                                {halal && <p>halal</p>}
                                {kosher && <p>kosher</p>}
                                {vegan && <p>vegan</p>}
                                {vegetarian && <p>vegetarian</p>}
                                {glutenFree && <p>glutenFree</p>} */}
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
                <div className="offers-list">
                    <h2>Offers List:</h2>
                    {showOffers && showOffers}
                </div>
            </div>
        </div>
    );
}
