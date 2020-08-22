import axios from "../axios";

export async function getOtherUserProfile(id) {
    try {
        const { data } = await axios.get("/user/" + id);

        return {
            type: "GET_USER",
            user: data,
            id,
        };
    } catch (err) {
        console.log("err in receive user action :", err);
    }
}

export async function getUserProfile() {
    try {
        const { data } = await axios.get("/user-profile");

        return {
            type: "GET_USER_PROFILE",
            userProfile: data,
        };
    } catch (err) {
        console.log("err in receive user action :", err);
    }
}
export async function getUserOfferProfile(id) {
    try {
        const { data } = await axios.get("/api/offers/" + id);
        return {
            type: "GET_USER_OFFER_PROFILE",
            UserOffer: data,
        };
    } catch (err) {
        console.log("err in receive user action :", err);
    }
}

export async function updateOffer(offer) {
    try {
        const { data } = await axios.post("/update-offer", offer);
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
export async function getOfferDetails(id) {
    try {
        const { data } = await axios.get("/get-offer-details/" + id);
        return {
            type: "GET_OFFER_DETAILS",
            offerDetails: data,
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
