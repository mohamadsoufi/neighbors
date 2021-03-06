import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import ProfilePic from "../components/ProfilePic";
import { BioEditor } from "./BioEditor";
import ImgUploader from "./ImgUploader";
// import Offer from "./Offer";
import { getUserProfile, getOffers } from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
// import { updateImg } from "../Redux/actions";

export function Profile(props) {
    const user = useSelector((state) =>
        state.userProfile ? state.userProfile : {}
    );
    const offers = useSelector(
        (state) =>
            state.offers &&
            state.offers.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            )
    );
    let { id, first, last, profile_pic: imgUrl } = user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile());
        dispatch(getOffers());
    }, []);

    let {
        user: { bio },
    } = props;

    // imgUrl = imgUrl || "../user.png";
    const [toggle, setToggle] = useState(false);
    const toggleModal = () => {
        setToggle(!toggle);
    };

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
                    <BioEditor
                        first={first}
                        id={id}
                        bio={bio}
                        setBio={props.setBio}
                    />
                    <div className="profile-right-side">
                        <ProfilePic imgUrl={imgUrl} toggleModal={toggleModal} />
                    </div>
                    {offers && (
                        <Link className="my-offer-link" to={"/offers/" + id}>
                            my offers
                        </Link>
                    )}
                </div>

                {toggle && (
                    <ImgUploader
                        imgUrl={imgUrl}
                        updateUrl={props.updateUrl}
                        toggleModal={toggleModal}
                    />
                )}
                <Link className="request-btn" to="/request">
                    <button>Request</button>
                </Link>

                <Link className="offer-btn" to="/offer">
                    <button>Offer</button>
                </Link>
            </div>
        </div>
    );
}
