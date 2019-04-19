import React, { useState, useEffect } from 'react';
import { getProduct, getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Helmet from 'react-helmet';

import './Product.scss';

export default function Product(props: any) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();

  var parts = props.location.pathname.split('/');
  var id = parts.pop();
  id = parseInt(id);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProduct(id);
      const resultCat = await getCategory(result.category.id, "", 0, 6);
      setProduct(result);
      setLoading(false);
      setCategories(resultCat);
    }
    fetchData();
  }, []);

  function fall(product: IProduct | undefined) {
    if (product !== undefined && categories !== undefined) {
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
              <h2 className = "more">Meira úr {product.category.title}</h2>
            </div>
            

      );
    } else {
      return '';
    }
  }

  function fall2(categories: IProduct[] | undefined) {
    console.log(categories)
    if (categories !== undefined) {
      return (
 
        <div className="Pcategory">
 
          {categories.map((data, i) => (
            <div key={i} className="Pproduct">
 
                <img className="img-responsive" width="450" height="300" src={data.image} alt="logo"/>
                <div className = "Pdesc">
                  <div className = "left">
                    <h1>{data.title}</h1>
                    <p>{data.category.title}</p>
                  </div>
                  <h2>{data.price} kr.-</h2>
                </div>
 
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
        {fall(product)}
        {fall2(categories)}
      </div>
    )}
  </div>
);

}