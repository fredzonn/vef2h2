import React from 'react';
import Field from '../field/Field';
import Button from '../button/Button';
import { connect } from 'react-redux';
import { postCart } from '../../actions/getCart';

interface IAddToCartState {
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    fjoldi?: number;
    voruNR?: number;
}

interface IAddToCartProps {
    dispatch: (func: any) => void;
    isFetching: boolean;
}

export function AddToCart(state: IAddToCartState, props: IAddToCartProps) {
    let {
        fjoldi,
        onChange,
        voruNR,
    } = state;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const { dispatch } = props;
        console.log(dispatch)

        dispatch(postCart(voruNR, fjoldi));
    }

    return (
        <React.Fragment>
            <form className="form__default" /*onSubmit={handleSubmit}*/>
                <Field
                    name="fjoldi"
                    value={fjoldi}
                    type="number"
                    label="Fjöldi"
                    onChange={onChange} />
                <div className="butt__container">
                    <Button>Bæta við körfu</Button>
                </div>
            </form>
        </React.Fragment>
    );
}

const mapStateToProps = (state: any) => ({
    isFetching: state.getCart.isFetching,
});

export default connect(mapStateToProps)(AddToCart);