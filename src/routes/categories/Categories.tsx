import React from 'react';
import { getProduct, getCategories } from '../../api/index';

export default async function CategoriesRoute() {
  //const data = await getProduct(1);
  //console.log(data)
  //const { initialData } = props;

  async function onFetchNewData(name: string) {
     /*setErTad(!erTad);
     setData(await getTodos(!erTad));*/
    const data = await getCategories("");
    console.log("data blaaaa: ", data );
    return data;
   }
  var data = await onFetchNewData("");
  console.log("data í cat: ",data);

  return (

    <React.Fragment>
    <p>categories</p>
    {data.map((item:any, i:any) => (
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
