import { getCategories } from '../../api/index';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { IProduct, ICategory } from '../../api/types';
import './categories.scss';


export default function CategoriesRoute() {

  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCategories(0, 50);
      setCategories(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function onClick(index: Number) {
    return location.href = "categories/"+index;
  }

  function fall(categories: ICategory[] | undefined) {
    if (categories !== undefined) {
      return (

        <div className="categories">

          {categories.map((data, i) => (
            <div key={i} className="category">

              <div className="categoryinn" key={data.id || i} onClick={() => onClick(data.id)}>
                <p>{data.title}</p>
              </div>

            </div>
          ))}

        </div>

      );;
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
        {fall(categories)}
      </div>
    )}
  </div>
);


}
