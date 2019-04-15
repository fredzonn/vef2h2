import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';

import { getProduct } from '../../api/index';

import './Home.scss';

export default function Home() {
  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <h2>Nýjar vörur</h2>
    </Fragment>
  );
}
