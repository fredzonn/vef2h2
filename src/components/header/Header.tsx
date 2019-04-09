import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

export default function Home() {
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
          <NavLink activeClassName="header__link--selected" exact to="/product">Nýjar vörur</NavLink>
          <NavLink activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>
        </div>
      </div>
    </header>
  );
}
