import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function ProfilePic(props) {
    // let { first, last, imgUrl } = props;
    const user = useSelector((state) => (state.user ? state.user : {}));
    let { profile_pic: imgUrl, first } = user;
    // console.log("user` in pp :", user);
    imgUrl = imgUrl || "./user.png";
    // console.log("imgUrl :", imgUrl);
    return (
        <Fragment>
            <img
                className="profile-pic"
                // className={props.profilePicSize}
                onClick={props.toggleModal}
                src={imgUrl}
                alt={first}
            />
        </Fragment>
    );
}
