import React, { Fragment, useState, useEffect } from 'react';

import { getProducts } from '../../api/index';
import Helmet from 'react-helmet';
import { IProduct } from '../../api/types';
import './Home.scss';


export default function Home() {

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProducts(0,6);
      setProducts(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function onClick(index: Number) {
    return location.href = "product/" + index;
  }

  function fall(product: IProduct[] | undefined) {
    if (product !== undefined) {
      return (

        <div className="Hproducts">

          {product.map((data, i) => (
            <div key={i} className="Hproduct">

              <div className="Hproduct__item" key={data.id || i} onClick={() => onClick(data.id)}>
                <img src={data.image} width="450" height="300" alt="Image"></img>
                  <div className = "Hdesc">
                    <h1>{data.title}</h1>
                    <p>{data.category}</p>
                    <h2>{data.price} kr.-</h2>
                  </div>
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
    <div className="Hcontainer">
    <Helmet title="Vörur" />
      {loading && (
          <h2 className="loading">Hleð gögnum...</h2>
      )}
      {!loading && (
        <div className="Hhaldari">
          <div className="Htitle">
            <h2>Nýjar vörur</h2>
          </div>
          {fall(products)}
        </div>
      )}
    </div>
  );
  
  
  }
  