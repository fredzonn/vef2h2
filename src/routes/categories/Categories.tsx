//import React from 'react';
import { getProduct, getCategories, getCategor } from '../../api/index';
import React, { Fragment, useState, useEffect } from 'react';

export default async function CategoriesRoute() {
  //const data = await getProduct(1);
  //console.log(data)
  //const { initialData } = props;

  async function onFetchNewData(name: string) {
     /*setErTad(!erTad);
     setData(await getTodos(!erTad));*/
     const data = await getCategor("");
    console.log("data blaaaa: ", data );
    return data;
  }
  //var data = await onFetchNewData("");
  //console.log("data í cat: ",data);

  const [product, setProduct] = useState();

  useEffect(() => {
      const fetchProduct = async () => {
             const result = await getCategories(2,2);
             setProduct(result);
      }
    fetchProduct();
  }, []);
  //var data = await useEffect();

  return (

    <React.Fragment>
    <p>categories</p>
    {product.map((item:any, i:any) => (
      <div>Hæ </div>
    ))}
    </React.Fragment>
  );
}

CategoriesRoute.getInitialProps = async () => {
  console.log("hæ hæ")
  const data = await getProduct(1);

  return { initialData: data };
}
