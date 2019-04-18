import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import './Login.scss';
import Button from '../../components/button/Button';
import { Redirect, NavLink } from 'react-router-dom';
import Field from '../../components/field/Field';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';

interface ILoginProps {
  dispatch: (func: any) => void;
  isFetching: boolean;
  isAuthenticated: boolean;
  message: Array<string>;
}

interface ILoginState {
  username: string;
  password: string;
}

export function Login(props: ILoginProps, state: ILoginState) {

  let {
    username,
    password,
  } = state;

  function handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
    const { name, value } = e.currentTarget;

    if (name === 'username') {

      username = value;
    }

    if (name === 'password') {

      password = value;
    }

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const { dispatch } = props;

    dispatch(loginUser(username, password));
  }


  const { isFetching, isAuthenticated, message } = props;

  if (isAuthenticated) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  if (isFetching) {
    return (
      <p>Skrái inn <em>{username}</em>...</p>
    );
  }

  return (
    <Fragment>
      <Helmet title="Innskráning" />
      <div className="login__container">
        <h1 className="login__header">Innskráning</h1>
        {message && (
          <ul>
            {message.map((error, i) =>
              <li key={i}>{error}</li>
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
          <div className="button__container">
            <Button disabled={isFetching}>Innskrá</Button>
          </div>
        </form>
        <div className="navlink__container">
          <NavLink to="/register">Nýskráning</NavLink>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  isFetching: state.auth.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
  message: state.auth.message,
});

export default connect(mapStateToProps)(Login);