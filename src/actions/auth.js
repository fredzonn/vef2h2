//import loginApi from '../api/loginApi';
import { post } from '../api/index';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user,
        message: null,
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message,
    };
}

function logout() {
    return {
        type: LOGIN_LOGOUT,
        isFetching: false,
        isAuthenticated: false,
        user: null,
    };
}

// Thunk!
export const loginUser = (username, password) => async (dispatch) => {
    dispatch(requestLogin());

    const endpoint = 'users/login';

    let login;
    try {
        login = await post(endpoint, { username, password });
    } catch (e) {
        return dispatch(loginError(e));
    }

    if (login.status !== 200) {
        const errorMessage = login.result;
        let error = [];
        errorMessage.forEach(el => {
            error.push(el.error);
        });
        return dispatch(loginError(error));
    }
    const { token } = login.result;
    window.localStorage.setItem('token', token);

    const { user } = login.result;
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(receiveLogin(user));
};

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
};