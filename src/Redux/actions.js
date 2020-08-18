import axios from "../axios";

export async function getUser() {
    try {
        const { data } = await axios.get("/user");
        return {
            type: "GET_USER",
            user: data,
        };
    } catch (err) {
        console.log("err in receive user action :", err);
    }
}

export async function updateBio(bio) {
    try {
        const { data } = await axios.post("/check-friendship", bio);

        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}

export async function updateImg(bio) {
    try {
        const { data } = await axios.post("/upload", bio);

        return {
            type: "ACCEPT_FRIEND_REQUEST",
            id,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}
