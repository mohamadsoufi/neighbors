import React, { useState } from "react";
import axios from "../axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);
    const submit = async () => {
        try {
            const { data } = await axios.post(url, values);
            data.success ? location.replace("/") : setError(true);
            console.log("data :", data);
        } catch (error) {
            console.log("error in use auth submit :", error);
            setError(true);
        }
    };
    return [error, submit];
}
