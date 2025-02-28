import React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.scss';
import { IUser } from '../../api/types';
import { logoutUser } from '../../actions/auth';

interface IHeaderProp {
  dispatch: (func: any) => void;
  user?: IUser;
}

interface IHeaderState {
  user: IUser;
}

export function Home(props: IHeaderProp, state: IHeaderState) {

  function logout(e: React.FormEvent<HTMLLinkElement>): void {
    const { dispatch } = props;

    dispatch(logoutUser());
    <Redirect to={{ pathname: '/' }} />
  }

  const { user } = props;

  if (user) {
    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">
            <Link className="header__titleLink" to="/"> Vefforritunarbúðin </Link>
          </h1>
          <div className="header__links">
            <NavLink activeClassName="header__link--selected" onClick={logout} exact to="/">{user.username} (Útskrá) </NavLink>
            <NavLink activeClassName="header__link--selected" exact to="/orders">Pantanir</NavLink>
            <NavLink activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
            <NavLink activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
            <NavLink activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <Link className="header__titleLink" to="/"> Vefforritunarbúðin </Link>
        </h1>
        <div className="header__links">
          <NavLink activeClassName="header__link--selected" exact to="/register">Nýskrá</NavLink>
          <NavLink activeClassName="header__link--selected" exact to="/login">Innskrá</NavLink>
          <NavLink activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
          <NavLink activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
          <NavLink activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home);
