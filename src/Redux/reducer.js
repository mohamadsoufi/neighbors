export default function reducer(state = {}, action) {
    if (action.type == "GET_USER") {
        state = {
            ...state,
            user: action.user,
        };
    }

    if (action.type == "UPDATE_OFFER") {
        state = {
            ...state,
            offer: action.offer,
        };
    }

    if (action.type == "GET_OFFER") {
        state = {
            ...state,
            offers: action.offers,
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

    return state;
}
