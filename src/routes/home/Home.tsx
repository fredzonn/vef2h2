import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import './Home.scss';

export default function Home() {

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <h2>Nýjar vörur</h2>
    </Fragment>
  );
}