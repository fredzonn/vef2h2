import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE,
} from '../actions/orders';

const initialState = {
    isFetching: false,
    orders: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                user: action.user,
                message: action.message,
            };
        case ORDER_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
            };
        default:
            return state;
    }
};
