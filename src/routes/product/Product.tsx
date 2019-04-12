import React, { Fragment } from 'react';

import { getProduct, useApi } from '../../api/index' 
import { IProduct } from '../../api/types' 


export default function Product() {

  const {items: product, loading, error} = useApi<IProduct|null>(getProduct.bind(null, id), null, [id]);


  return (
    <p>product</p>
  );
}
