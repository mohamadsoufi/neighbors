export default function reducer(state = {}, action) {
    if (action.type == "GET_USER") {
        state = {
            ...state,
            user: action.user,
        };
    }

    if (action.type == "GET_USER_PROFILE") {
        state = {
            ...state,
            userProfile: action.userProfile,
        };
    }
    if (action.type == "GET_USER_OFFER_PROFILE") {
        state = {
            ...state,
            UserOffers: action.UserOffers,
        };
    }

    if (action.type == "GET_USER_REQUEST_PROFILE") {
        state = {
            ...state,
            UserRequests: action.UserRequests,
        };
    }

    if (action.type == "UPDATE_OFFER") {
        state = {
            ...state,
            offer: action.offer,
        };
    }

    if (action.type == "GET_OFFERS") {
        state = {
            ...state,
            offers: action.offers,
        };
    }

    if (action.type == "GET_OFFER_DETAILS") {
        state = {
            ...state,
            offerDetails: action.offerDetails,
        };
    }

    if (action.type == "GET_ALL_OFFERS") {
        state = {
            ...state,
            allOffers: action.allOffers,
        };
    }

    if (action.type == "GET_ALL_REQUESTS") {
        state = {
            ...state,
            allRequests: action.allRequests,
        };
    }

    if (action.type == "UPDATE_REQUEST") {
        state = {
            ...state,
            request: action.request,
        };
    }

    if (action.type == "GET_REQUESTS") {
        state = {
            ...state,
            requests: action.requests,
        };
    }
    if (action.type == "GET_USERS_LOCATION") {
        state = {
            ...state,
            locations: action.locations,
        };
    }

    if (action.type == "CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage],
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages,
            id: action.id,
        };
    }

    return state;
}
