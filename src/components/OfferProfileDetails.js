import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    getOtherUserProfile,
    getOffers,
    getUserOfferProfile,
    getOfferDetails,
} from "../Redux/actions";

export default function OfferProfileDetails(props) {
    // const [offerValue, setOfferValue] = useState({ quantity: "1" });
    const dispatch = useDispatch();

    const { id } = props.match.params;
    const offerDetail = id;

    const user = useSelector((state) => (state.user ? state.user : {}));
    const offers = useSelector((state) =>
        state.offerDetails ? state.offerDetails : []
    );

    let userId = null;
    if (offers[0]) {
        userId = offers[0].sender_id;
    }
    useEffect(() => {
        dispatch(getOtherUserProfile(userId));
        dispatch(getUserOfferProfile(userId));
    }, [userId]);

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(getOfferDetails(id));
    }, []);

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";

    const showOffer = (
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
                    if (id == offerDetail) {
                        return (
                            <div key={i}>
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
                                {halal && <p>halal</p>}
                                {kosher && <p>kosher</p>}
                                {vegan && <p>vegan</p>}
                                {vegetarian && <p>vegetarian</p>}
                                {glutenFree && <p>glutenFree</p>}
                            </div>
                        );
                    }
                })}
        </div>
    );
    console.log("id :", user.id);
    console.log("userId :", userId);

    const makeReq = () => {
        console.log("reqqqqq");
    };

    // const checkId = ({ id }) => {
    //     if (user.id == userId) {
    //         console.log("id, userId :", id, userId);
    //         return (
    //             <div>
    //                 <Link to="#">
    //                     <button onClick={makeReq}>Request</button>
    //                 </Link>
    //             </div>
    //         );
    //     }
    // };

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
                <div className="offers-list">
                    <h2>Offers Detail:</h2>
                    {showOffer && showOffer}
                    {/* {
                   if (id != userId) {
                       <Link to="#">
                       <button onClick={makeReq}>Request</button>
                    }
                       </Link>} */}
                </div>
                {/* {<div>{checkId}</div>} */}
                {user.id && user.id !== userId && (
                    <div>
                        <Link to="#">
                            <button onClick={makeReq}>Order</button>
                        </Link>
                    </div>
                )}

                <Link className="back-icon-link" to={`/offers/${userId}`}>
                    <img className="back-icon" src="/back.png" />
                </Link>
            </div>
        </div>
    );
}
