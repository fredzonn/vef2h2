import {
    CART_REQUEST,
    CART_SUCCESS,
    CART_FAILURE,
} from '../actions/getCart';

const initialState = {
    isFetching: false,
    cart: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CART_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case CART_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                cart: action.cart,
            };
        case CART_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
            };
        default:
            return state;
    }
};