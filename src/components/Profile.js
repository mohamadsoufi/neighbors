import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfilePic from "../components/ProfilePic";
import { BioEditor } from "./BioEditor";
// import { updateBio } from "./Redux/actions";

export function Profile(props) {
    let {
        user: { id, first, last, email, profile_pic: imgUrl, bio },
    } = props;
    imgUrl = imgUrl || "../user.png";
    const [toggle, setToggle] = useState(false);
    const toggleModal = () => {
        setToggle(!toggle);
    };
    console.log("toggle :", toggle);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     // dispatch(getUser());
    //     console.log("effecttt");
    // }, [setBio]);

    // const setBio = (e) => {
    //     console.log("bio in set bio>>>>>>:");
    //     dispatch(updateBio(e));
    // };

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
                {/* {ProfilePic && (
                    <Uploader
                        imgUrl={this.state.imgUrl}
                        toggleModal={() => this.toggleModal()}
                        updateUrl={(e) => this.updateUrl(e)}
                    />
                )} */}
                <button className="request-btn">Request</button>
                <button className="offer-btn">Offer</button>
            </div>
        </div>
    );
}
