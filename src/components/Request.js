import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateRequest } from "../Redux/actions";
import Search from "./Search";
import Map from "./Map";

export default function Request({ history }) {
    const [formValue, setFormValue] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));

    let { first, last, email, profile_pic: imgUrl, bio } = user;
    imgUrl = imgUrl || "../user.png";
    const submit = (e) => {
        e.preventDefault();
        const newLocation = {};
        dispatch(updateRequest(formValue));
        newLocation.pathname = "/request-profile";
        history.push(newLocation);
    };

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
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
                {bio && <h2 className="bio-text-container">{bio}</h2>}

                <div className="profile-right-side">
                    <img className="profile-pic" src={imgUrl} alt={first} />
                </div>

                <div className="form-container">
                    <h2>Make a Request</h2>
                    <input type="date" name="date" />
                    {/* <Search /> */}
                    <Map
                        handleChangeInSearch={handleChangeInSearch}
                        searchOnly
                    />

                    <div className="quantity-container">
                        <p>quantity : </p>

                        <select
                            name="quantity"
                            nChange={handleChange}
                            id="quantity"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <h4>Food dietary</h4>
                    <form onChange={handleChange}>
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
