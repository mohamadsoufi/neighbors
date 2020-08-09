import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "../hooks/useStatefulFields";
import { useAuthSubmit } from "../hooks/useAuthSubmit";


export function Login() {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/login", fields);
    return (
        <div>
            {error && <div>Oops! Something went wrong.</div>}
            <input onChange={handleChange} name="email" placeholder="email" />
            <input
                onChange={handleChange}
                name="pw"
                placeholder="password"
                type="password"
            />
            <button onClick={submit}>LOG IN</button>
                <Link to="/">register</Link>

        </div>
    );
 
}