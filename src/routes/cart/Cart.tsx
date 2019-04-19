import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';


import './Cart.scss';
import { IUser, IOrderLines, IOrders } from '../../api/types';
import { getCart } from '../../actions/getCart';
import Field from '../../components/field/Field';
import Button from '../../components/button/Button';
import { postOrder } from '../../actions/orders';
import EditCart from '../../components/cart/EditCart';

interface ICartProps {
  dispatch: (func: any) => void;
  user: IUser;
  cart: IOrderLines;
  isFetching: boolean;
  message: string;
  errors: Array<any>;
  success: boolean;
  isFetchingOrder: boolean;
}

interface ICartState {
  isFetching: false;
  cart: null;
  message: null;
  nafn: string;
  address: string;
  user: IUser;
}

export function Cart(props: ICartProps, state: ICartState) {
  const { cart, isFetching, user, message, errors, success, isFetchingOrder } = props;
  if (user) {
    useEffect(() => {
      const fetchData = async () => {
        const { dispatch } = props;
        dispatch(getCart())
      }
      fetchData();
    }, []);
  }

  let { nafn, address } = state;
  if (message) {
    return (
      <p>{message}</p>
    )
  }

  function handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;
    if (name === 'nafn') {
      nafn = value;
    }

    if (name === 'address') {
      address = value;
    }

  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { dispatch } = props;
    console.log(nafn, address, cart.result.lines)
    dispatch(postOrder(nafn, address, cart.result.lines));
  }
  // console.log(errors);
  // console.log('karfa', cart)

  if (user) {
    if (isFetching) {
      return (
        <React.Fragment>
          <Helmet title="Karfa" />
          <div className="cart_container">
            <h1>Sæki körfu...</h1>
          </div>
        </React.Fragment>
      )
    } else if (cart != null) {
      const karfa = cart.result.lines;
      return (
        <React.Fragment>
          <Helmet title="Karfa" />
          <div className="cart__container">
            {karfa.map((item: any, i: number) => (
              <div className="cart__item" key={i}>
                <div className="cart__item__image">
                  <img src={item.image} width="250" height="200" alt="Image" />
                </div>
                <div className="cart__item__about">
                  <h1>{item.title}</h1>
                  <p>Verð: {item.price} kr.-</p>
                </div>
                <div className="cart__item__addtocart">
                  <EditCart
                    fjoldi={item.quantity}
                    total={item.total}
                    voruNR={item.id} />
                </div>
              </div>
            ))}
            <div className="cart__total">
              <h3>Karfa samtals: {cart.result.total} kr.-</h3>
            </div>
            <div className="cart__sendapontun">
              <h1>Senda inn pöntun</h1>
              {errors && (
                <ul>
                  {errors.map((error, i) =>
                    <li key={i}>{error.field}: {error.error}</li>
                  )}
                </ul>
              )}
              {isFetchingOrder ?
                <p>Sendi pöntun...</p> :
                success ?
                  <p>Pöntun send!</p> :
                  <form className="form__default" onSubmit={handleSubmit}>
                    <Field
                      name="nafn"
                      value={nafn}
                      type="text"
                      label="Nafn:"
                      onChange={handleInputChange}
                    />
                    <Field
                      name="address"
                      value={address}
                      type="text"
                      label="Heimilisfang:"
                      onChange={handleInputChange}
                    />
                    <div className="button__container">
                      <Button disabled={isFetching}>Senda inn pöntun</Button>
                    </div>
                  </form>
              }
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  return (
    <React.Fragment>
      <Helmet title="Karfa" />
      <div className="cart__container">
        <h1 className="cart__header">Vinsamlegast skráðu þig inn.</h1>
        <div className="navlink__container">
          <NavLink to="/login">Innskráning</NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isFetching: state.getCart.isFetching,
    cart: state.getCart.cart,
    user: state.auth.user,
    message: state.getCart.message,
    errors: state.orders.message,
    isFetchingOrder: state.orders.isFetching,
    success: state.orders.success,
  }
}

export default connect(mapStateToProps)(Cart);