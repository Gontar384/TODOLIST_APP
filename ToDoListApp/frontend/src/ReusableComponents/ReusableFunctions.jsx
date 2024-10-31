import {useState} from "react";

export const checksPassword = (password) => {

    const comms = [];

    if (password.trim().length < 5) {
        comms.push("*Password has to be at least 5 chars long");
        return comms;
    }
    if (!/[A-Z]/.test(password)) {
        comms.push("*Password has to include at least one uppercase");
    }
    if (!/[a-z]/.test(password)) {
        comms.push("*Password has to include at least one lowercase");
    }
    if (!/\d/.test(password)) {
        comms.push("*Password has to include at least one number");
    }

    return comms;
}

export const useToggleInputType = () => {
    const [inputType, setInputType] = useState("password");
    const toggleInputType = () =>
        setInputType(prevType =>
        (prevType === "password" ? "text" : "password"));
    return [inputType, toggleInputType];
}


