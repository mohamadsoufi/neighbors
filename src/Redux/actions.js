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

export async function updateOffer(offer) {
    console.log("offer in action :", offer);
    try {
        const { data } = await axios.post("/update-offer", offer);
        console.log("data  in action:", data);
        return {
            type: "UPDATE_OFFER",
            offer: data,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}

export async function getOffers() {
    try {
        const { data } = await axios.get("/get-offers");
        return {
            type: "GET_OFFER",
            offers: data,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}

export async function updateRequest(request) {
    try {
        const { data } = await axios.post("/update-request", request);
        return {
            type: "UPDATE_REQUEST",
            request: data,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}

export async function getRequests() {
    try {
        const { data } = await axios.get("/get-requests");
        return {
            type: "GET_REQUESTS",
            requests: data,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}

export async function getUsersLocation() {
    try {
        const { data } = await axios.get("/get-users-location");
        console.log("data i action get location :", data);
        return {
            type: "GET_USERS_LOCATION",
            locations: data,
        };
    } catch (err) {
        console.log("err in receive friendsWannabes action :", err);
    }
}
