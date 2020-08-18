import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateOffer } from "../Redux/actions";

export default function Offer(props) {
    const [formValue, setFormValue] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";
    const submit = () => {
        dispatch(updateOffer(formValue));
    };

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
    };
    console.log("formValue :", formValue);

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

                <div className="form-container">
                    <h2>Offer</h2>
                    <form onChange={handleChange}>
                        <input type="date" name="date" />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="meal"
                            placeholder="meal name"
                        />
                        <select name="quantity" id="quantity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                        <div>
                            <input
                                className="check"
                                type="checkbox"
                                id="halal"
                                name="halal"
                                value="halal"
                            />
                            <label htmlFor="halal">Halal</label>
                        </div>
                        <div>
                            <input
                                className="check"
                                type="checkbox"
                                id="vegan"
                                name="vegan"
                                value="vegan"
                            />
                            <label htmlFor="vegan">Vegan</label>
                        </div>
                        <button onClick={submit} type="submit">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
