import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import './Register.scss';
import Field from '../../components/field/Field';
import Button from '../../components/button/Button';
import { Redirect, NavLink, Switch } from 'react-router-dom';
import { registerUser } from '../../actions/register';
import { connect } from 'react-redux';

interface IRegisterState {
  username: string;
  password: string;
  email: string;
}

interface IRegisterProps {
  dispatch: (func: any) => void;
  isFetching: boolean;
  user: any;
  message: Array<any>;
  success: boolean;
}


export function Register(props: IRegisterProps, state: IRegisterState) {
  let {
    username,
    password,
    email,
  } = state;

  const {
    isFetching,
    user,
    message,
    success,
  } = props;

  function handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;

    if (name === 'username') {

      username = value;
    }

    if (name === 'password') {

      password = value;
    }

    if (name === 'email') {

      email = value;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { dispatch } = props;

    dispatch(registerUser(username, password, email));
  }

  console.log(user, success);

  if (success) {
    return (
      <Redirect to={{ pathname: '/login' }} />
    );
  }

  return (
    <Fragment>
      <Helmet title="Nýskráning" />
      <div className="register__container">
        <h1 className="register__header">Nýskráning</h1>
        {message && (
          <ul>
            {message.map((error, i) =>
              <li key={i}>{error.field}: {error.error}</li>
            )}
          </ul>
        )}
        <form className="form__default" onSubmit={handleSubmit}>
          <Field
            name="username"
            value={username}
            type="text"
            label="Notendanafn:"
            onChange={handleInputChange}
          />
          <Field
            name="password"
            value={password}
            type="password"
            label="Lykilorð:"
            onChange={handleInputChange}
          />
          <Field
            name="email"
            value={email}
            type="email"
            label="Netfang:"
            onChange={handleInputChange}
          />
          <div className="button__container">
            <Button disabled={isFetching}>Nýskrá</Button>
          </div>
        </form>
        <div className="navlink__container">
          <NavLink to="/login">Innskráning</NavLink>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({
  isFetching: state.register.isFetching,
  user: state.register.user,
  message: state.register.message,
  success: state.register.success,
});

export default connect(mapStateToProps)(Register);