import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import ProfilePic from "../components/ProfilePic";
import { BioEditor } from "./BioEditor";
import ImgUploader from "./ImgUploader";
import Offer from "./Offer";
// import { updateImg } from "../Redux/actions";

// import { useDispatch, useSelector } from "react-redux";

export function Profile(props) {
    let {
        user: { id, first, last, email, profile_pic: imgUrl, bio },
    } = props;
    imgUrl = imgUrl || "../user.png";
    const [toggle, setToggle] = useState(false);
    const toggleModal = () => {
        setToggle(!toggle);
    };

    return (
        <div>
            <div className="profile-content-container">
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
                    <ProfilePic toggleModal={toggleModal} />
                </div>

                {toggle && (
                    <ImgUploader
                        imgUrl={imgUrl}
                        updateUrl={props.updateUrl}
                        toggleModal={toggleModal}
                    />
                )}
                <button className="request-btn">Request</button>
                <Link to="/offer">
                    <button className="offer-btn">Offer</button>
                </Link>
            </div>
        </div>
    );
}
