import React from 'react';
import Field from '../field/Field';
import Button from '../button/Button';
import { connect } from 'react-redux';
import { IUser, IOrderLines } from '../../api/types';
import { deleteCartID } from '../../actions/getCart';

interface IAddToCartState {
  fjoldi: any;
  total: any;
  voruNR: any;
}

interface ICartProps {
  dispatch: (func: any) => void;
  user: IUser;
  cart: IOrderLines;
  isFetching: boolean;
  message: string;
  fjoldi: any;
  total: any;
  voruNR: any;
}

export function AddToCart(props: ICartProps, state: IAddToCartState) {
  let { fjoldi, total } = props;

  function handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    console.log(value);
    fjoldi = value;
  }

  function handleEyda(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { dispatch } = props;
    const { voruNR } = props;
    dispatch(deleteCartID(voruNR));
  }

  return (
    <React.Fragment>
      <div className="addtocart__item__row">
        <Field
          name="fjoldi"
          value={fjoldi}
          type="number"
          label="Fjöldi:"
          onChange={handleInputChange}
        />
      </div>
      <Button>Uppfæra</Button>
      <form className="form__default" onSubmit={handleEyda}>
        <div className="addtocart__item__colum">
          <h3>Samtals: {total} kr.-</h3>
          <Button>Eyða línu</Button>
        </div>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isFetching: state.getCart.isFetching,
    cart: state.getCart.cart,
    user: state.auth.user,
    message: state.getCart.message,
  }
}

export default connect(mapStateToProps)(AddToCart);
