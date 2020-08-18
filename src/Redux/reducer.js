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
            user: action.user,
        };
    }

    return state;
}
