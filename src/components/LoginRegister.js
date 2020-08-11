import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { useState } from "react";

export function LoginRegister() {
    const [values, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", values);
    const [hasAccount, setHasAccount] = useState(false);
    useEffect(() => {
        if (location.hash.slice(1) == "#/register") {
            setHasAccount(false);
        } else if (location.hash.slice(1) == "/login") {
            setHasAccount(true);
        }
    }, [hasAccount]);

    console.log("hasAccount :", hasAccount);
    console.log("location.hash :", location.hash.slice(1));
    return (
        <div>
            {!!error && <div>Oops! Something went wrong.</div>}
            {!hasAccount && (
                <div>
                    <input
                        onChange={handleChange}
                        name="first"
                        placeholder="first name"
                    />
                    <input
                        onChange={handleChange}
                        name="last"
                        placeholder="last name"
                    />
                </div>
            )}

            <input onChange={handleChange} name="email" placeholder="email" />
            <input
                onChange={handleChange}
                name="pw"
                placeholder="password"
                type="password"
            />

            {!hasAccount && (
                <div>
                    <button onClick={submit}>REGISTER</button>
                    <Link to="/login">login</Link>
                </div>
            )}

            {!!hasAccount && (
                <div>
                    <button onClick={submit}>LOG IN</button>
                    <Link to="/register">register</Link>
                </div>
            )}
        </div>
    );
}
