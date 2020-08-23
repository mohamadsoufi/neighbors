import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { useState } from "react";
//

export function LoginRegister() {
    const [values, handleChange] = useStatefulFields();
    const [url, setUrl] = useState();
    const [hasAccount, setHasAccount] = useState(false);
    const [error, submit] = useAuthSubmit(url, values);
    useEffect(() => {
        if (location.hash.slice(1) == "/register") {
            setHasAccount(false);
            setUrl("/register");
        } else if (location.hash.slice(1) == "/login") {
            setHasAccount(true);
            setUrl("/login");
        }
    }, [hasAccount]);

    const renderSubmitButton = () =>
        hasAccount ? (
            <div className="login-register-btn-link">
                <button onClick={submit}>LOG IN</button>
                <Link to="/register">REGISTER</Link>
            </div>
        ) : (
            <div className="login-register-btn-link">
                <button onClick={submit}>REGISTER</button>
                <Link to="/login">LOGIN</Link>
            </div>
        );
    return (
        <div className="login-register-container">
            {!!error && <div>Oops! Something went wrong.</div>}
            {!hasAccount && (
                <div className="first-last-container">
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
            {renderSubmitButton()}
        </div>
    );
}
