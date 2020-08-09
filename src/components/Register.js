import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";


export function Register() {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/register", fields);

    return (
        <div>
        
            {error && <div>Oops! Something went wrong.</div>}
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
            <input onChange={handleChange} name="email" placeholder="email" />
            <input
                onChange={handleChange}
                name="pw"
                placeholder="password"
                type="password"
            />
            <button onClick={submit}>REGISTER</button>
                <Link to="/login">login</Link>

        </div>
    );
}