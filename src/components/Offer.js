import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOffer, getOffers, getUserProfile } from "../Redux/actions";

import Map from "./Map";

export default function Offer({ history }) {
    const [formValue, setFormValue] = useState({ quantity: "1" });

    const user = useSelector((state) =>
        state.userProfile ? state.userProfile : {}
    );
    let { id, first, last, email, profile_pic: imgUrl, bio } = user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile());
    }, []);

    imgUrl = imgUrl || "../user.png";
    const submit = (e) => {
        e.preventDefault();
        const newLocation = {};
        dispatch(updateOffer(formValue));
        dispatch(getOffers());

        newLocation.pathname = "/offers/" + id;
        history.push(newLocation);
    };

    const handleChange = (e) => {
        // console.log("name:", e.target.name, "val:", e.target.value);
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleChecklistChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.checked,
        });
    };
    const handleChangeInSearch = (address) => {
        setFormValue({
            ...formValue,
            address,
        });
    };
    // console.log("formValue :", formValue);

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
                <div className="form-container">
                    <h2>Make an Offer</h2>
                    <input type="date" name="date" onChange={handleChange} />
                    <input
                        onChange={handleChange}
                        type="text"
                        name="meal"
                        placeholder="meal name"
                    />
                    <Map
                        handleChangeInSearch={handleChangeInSearch}
                        searchOnly
                    />

                    <div className="quantity-container">
                        <p>quantity : </p>
                        <select
                            name="quantity"
                            id="quantity"
                            onChange={handleChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <form onChange={handleChecklistChange}>
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
                                id="kosher"
                                name="kosher"
                                value="kosher"
                            />
                            <label htmlFor="kosher">Kosher</label>
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
                        <div>
                            <input
                                className="check"
                                type="checkbox"
                                id="vegetarian"
                                name="vegetarian"
                                value="vegetarian"
                            />
                            <label htmlFor="vegetarian">Vegetarian</label>
                        </div>

                        <div>
                            <input
                                className="check"
                                type="checkbox"
                                id="glutenFree"
                                name="glutenFree"
                                value="glutenFree"
                            />
                            <label htmlFor="glutenFree">Gluten-free</label>
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
