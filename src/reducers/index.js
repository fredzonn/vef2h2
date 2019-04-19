import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import getCart from './getCart';
import orders from './orders';



export default combineReducers({
    auth, register, getCart, orders,
});
