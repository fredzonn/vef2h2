import { post } from '../api/index';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


function signupRequest() {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true,
        message: null,
    }
}

function signupSuccess(user) {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false,
        user,
        success: true,
        message: null,
    }
}

function signupError(message) {
    return {
        type: SIGNUP_FAILURE,
        isFetching: false,
        message,
    }
}

export const registerUser = (username, password, email) => {
    return async (dispatch) => {
        dispatch(signupRequest());

        const endpoint = 'users/register';

        let register;

        try {
            register = await post(endpoint, { username, password, email })
        } catch (error) {
            return dispatch(signupError(error));
        }


        if (register.status !== 201) {
            const { errors } = register.result;
            console.log(errors)
            return dispatch(signupError(errors));
        }

        const { result } = register;

        dispatch(signupSuccess(result));
    }
}