import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOGOUT, AUTHENTICATE, AUTHENTICATE_REQUEST } from '../actions/auth';

// Ef það er notandi í localStorage erum við með innskráðan notanda
// hér gætum við líka sótt token
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    user: user, // setjum vistaðan notanda í upphafsstöðu
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                user: action.user,
                message: action.message,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                message: action.message,
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                user: action.user,
            };
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
                user: action.user,
                message: action.message,
            };
        case AUTHENTICATE_REQUEST:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
                user: action.user,
                message: action.message,
            };
        default:
            return state;
    }
};
