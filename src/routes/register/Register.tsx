import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import './Register.scss';
import Field from '../../components/field/Field';
import Button from '../../components/button/Button';
import { Link, NavLink } from 'react-router-dom';

export default function Register() {
  return (
    <Fragment>
      <Helmet title="Nýskráning" />
      <div className="register__container">
        <h1 className="register__header">Nýskráning</h1>
        <form className="form__default">
          <Field
            name="username"
            //value={}
            type="text"
            label="Notendanafn:"
          //onChange={handleInputChange}
          />
          <Field
            name="password"
            //value={}
            type="password"
            label="Lykilorð:"
          //onChange={handleInputChange}
          />
          <Field
            name="email"
            //value={}
            type="email"
            label="Netfang:"
          //onChange={handleInputChange}
          />
        </form>
        <div className="button__container">
          <Button>Nýskrá</Button>
        </div>
        <div className="navlink__container">
          <NavLink to="/login">Innskráning</NavLink>
        </div>
      </div>
    </Fragment>
  )
}
