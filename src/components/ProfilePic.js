import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function ProfilePic(props) {
    let { imgUrl } = props;
    imgUrl = imgUrl || "./user.png";
    return (
        <Fragment>
            <img
                className="profile-pic"
                // className={props.profilePicSize}
                onClick={props.toggleModal}
                src={imgUrl}
            />
        </Fragment>
    );
}
