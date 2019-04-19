import React, { useState, useEffect } from 'react';
import { getProduct } from '../../api/index';
import { IProduct } from '../../api/types';
import Helmet from 'react-helmet';

import './Product.scss';

export default function Product(/*{props} : { props: any}*/props: any) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  var parts = props.location.pathname.split('/');
  var id = parts.pop();
  id = parseInt(id);
  console.log("þetta er vitlaust?: ",id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProduct(id);
      console.log("þetta er final countdown: ",result);
      setProduct(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  function fall(product: IProduct | undefined) {
    if (product !== undefined) {
      return (

        <div className="product">

            <div className="product__item">

                <img className="img-responsive" src={product.image} alt="logo"/>
                <div className = "desc">
                  <h1>{product.title}</h1>
                    <div className = "info">
                      <p>Flokkur: {product.category.title}</p>
                      <p>Verð: {product.price} kr.-</p>
                    </div>
                  <p>{product.description}</p>
                </div>
              </div>
              <h2>Meira úr {product.category.title}</h2>
            </div>
            

      );
    } else {
      return '';
    }
  }

  return (
  <div className="container">
  <Helmet title="Flokkar" />
    {loading && (
        <h2 className="loading">Hleð gögnum...</h2>
    )}
    {!loading && (
      <div className="haldari">
        {fall(product)}
      </div>
    )}
  </div>
);

}