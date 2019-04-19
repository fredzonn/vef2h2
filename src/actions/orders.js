import { get, post } from '../api/index';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';

function requestOrder() {
    return {
        type: ORDER_REQUEST,
        isFetching: true,
    };
}

function receiveOrder(order) {
    return {
        type: ORDER_SUCCESS,
        isFetching: false,
        success: true,
        order,
        message: null,
    };
}

function orderError(message) {
    return {
        type: ORDER_FAILURE,
        isFetching: false,
        message,
    };
}

export const getOrder = () =>
    async (dispatch) => {
        dispatch(requestOrder());

        let endpoint = 'orders/';
        let order;

        try {
            order = await get(endpoint);
        } catch (e) {
            dispatch(orderError(e));
        }
        console.log(order.status);
        console.log(order.result);
        if (order.status !== 200) {
            dispatch(orderError('Ekkert í körfu'));
        }

        dispatch(receiveOrder(order));

    }

export const postOrder = (name, address, cart) =>
    async (dispatch) => {
        dispatch(requestOrder());

        let endpoint = 'orders/';
        let order;
        console.log('Hér i postOrders:', name, address, cart)
        try {
            order = await post(endpoint, { name, address, cart });
        } catch (e) {
            dispatch(orderError(e));
        }
        console.log(order.status);
        console.log('result', order.result);
        if (order.status !== 201) {
            const { errors } = order.result;
            if (errors) {
                console.log('error her', errors)
                dispatch(orderError(errors));
            }
        }

        dispatch(receiveOrder(order));

    }
