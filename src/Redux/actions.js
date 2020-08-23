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
        console.log("err in getOtherUserProfile action :", err);
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
        console.log("err in getUserProfile action :", err);
    }
}
export async function getUserOfferProfile(id) {
    try {
        const { data } = await axios.get("/api/offers/" + id);
        return {
            type: "GET_USER_OFFER_PROFILE",
            UserOffers: data,
        };
    } catch (err) {
        console.log("err in getUserOfferProfile action :", err);
    }
}

export async function getUserRequestProfile(id) {
    try {
        const { data } = await axios.get("/api/requests/" + id);
        console.log("data in get user req :", data);
        return {
            type: "GET_USER_REQUEST_PROFILE",
            UserRequests: data,
        };
    } catch (err) {
        console.log("err in getUserRequestProfile action :", err);
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
        console.log("err in  updateOffer action :", err);
    }
}

export async function getOffers() {
    try {
        const { data } = await axios.get("/get-offers");

        return {
            type: "GET_OFFERS",
            offers: data,
        };
    } catch (err) {
        console.log("err in getOffers action :", err);
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
        console.log("err in getOfferDetails action :", err);
    }
}
export async function getRequestDetails(id) {
    try {
        const { data } = await axios.get("/get-offer-details/" + id);
        return {
            type: "GET_OFFER_DETAILS",
            offerDetails: data,
        };
    } catch (err) {
        console.log("err in getRequestDetails action :", err);
    }
}

export async function getAllOffers() {
    try {
        const { data } = await axios.get("/get-all-offers");

        return {
            type: "GET_ALL_OFFERS",
            allOffers: data,
        };
    } catch (err) {
        console.log("err in getAllOffers action :", err);
    }
}

export async function getAllRequests() {
    try {
        const { data } = await axios.get("/get-all-requests");

        return {
            type: "GET_ALL_REQUESTS",
            allRequests: data,
        };
    } catch (err) {
        console.log("err in getAllRequests action :", err);
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
        console.log("err in updateRequest action :", err);
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
        console.log("err in getRequests action :", err);
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
        console.log("err in getUsersLocation action :", err);
    }
}

export async function chatMessage(chatMessage) {
    return {
        type: "CHAT_MESSAGE",
        chatMessage,
    };
}
export async function chatMessages(msgs) {
    let id = msgs.slice(0, 1);
    let chatMessages = msgs.slice(1, 10);
    return {
        type: "CHAT_MESSAGES",
        chatMessages,
        id,
    };
}
