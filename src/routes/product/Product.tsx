import React, { useState, useEffect } from 'react';
import { getProduct } from '../../api/index';
import { IProduct } from '../../api/types';
import Helmet from 'react-helmet';

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

  function fall(product: IProduct[] | undefined) {
    if (product !== undefined) {
      return (

        <div className="product">

          {product.map((data, i) => (
            <div key={i} className="product__item">

                <img className="img-responsive" src={data.image} alt="logo"/>
                <p>{data.title}</p>
                <div>{data.category.title}</div>
                <div>{data.price}</div>


            </div>
          ))}

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
        <h2>Skoðaðu vöruflokkana okkar</h2>
        {fall(product)}
      </div>
    )}
  </div>
);

}