import React, { Fragment, useState, useEffect } from 'react';

import { getProducts, getCategories } from '../../api/index';
import Helmet from 'react-helmet';
import { IProduct, ICategory } from '../../api/types';
import './Home.scss';


export default function Home() {

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProducts(0,6);
      const resultCat = await getCategories(0, 50);
      setProducts(result);
      setCategories(resultCat);
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

  function fall2(categories: ICategory[] | undefined) {
    if (categories !== undefined) {
      return (

      <div className = "holder">

      <button className = "buttonCat">Skoða alla flokka</button>

        <div className="categories">

          {categories.map((data, i) => (
            <div key={i} className="category">

              <div className="categoryinn" key={data.id || i} onClick={() => onClick(data.id)}>
                <p>{data.title}</p>
              </div>

            </div>
          ))}

        </div>
      </div>

      );;
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
          {fall2(categories)}
        </div>
      )}
    </div>
  );
  
  
  }
