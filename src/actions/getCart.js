import { get, deleteID, post } from '../api/index';

export const CART_REQUEST = 'CART_REQUEST';
export const CART_SUCCESS = 'CART_SUCCESS';
export const CART_FAILURE = 'CART_FAILURE';

function requestCart() {
    return {
        type: CART_REQUEST,
        isFetching: true,
    };
}

function receiveCart(cart) {
    return {
        type: CART_SUCCESS,
        isFetching: false,
        cart,
        message: null,
    };
}

function cartError(message) {
    return {
        type: CART_FAILURE,
        isFetching: false,
        message,
    };
}

export const getCart = () =>
    async (dispatch) => {
        dispatch(requestCart());

        let endpoint = 'cart/';
        let cart;

        try {
            cart = await get(endpoint);
        } catch (e) {
            dispatch(cartError(e));
        }
        console.log(cart.status);
        if (cart.status !== 200) {
            dispatch(cartError('Ekkert í körfu'));
        }

        dispatch(receiveCart(cart));

    }

export const deleteCartID = (id) =>
    async (dispatch) => {
        dispatch(requestCart());

        let endpointDel = 'cart/line/' + id;
        let endpointGet = 'cart/';
        let cart;

        try {
            await deleteID(endpointDel);
            cart = await get(endpointGet);
        } catch (e) {
            dispatch(cartError(e));
        }
        if (cart.status !== 200) {
            dispatch(cartError('Ekkert í körfu'));
        }

        dispatch(receiveCart(cart));

    }

export const postCart = (product, quantity) =>
    async (dispatch) => {
        dispatch(requestCart());

        let endpoint = 'cart/';
        let cart;
        try {
            cart = await post(endpoint, { product, quantity });
        } catch (e) {
            dispatch(cartError(e));
        }
        console.log(cart.status);
        console.log('result', cart.result);
        if (cart.status !== 201) {
            const { errors } = cart.result;
            if (errors) {
                console.log('error her', errors)
                dispatch(cartError(errors));
            }
        }

        dispatch(receiveCart(cart));

    }