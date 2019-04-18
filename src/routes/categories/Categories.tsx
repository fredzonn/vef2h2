//import React from 'react';
import { getProduct, getCategories, getCategor } from '../../api/index';
import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { IProduct, ICategory } from '../../api/types';

export default /*async*/ function CategoriesRoute() {
  /*const [categoryState, setCategoryState] = useState();
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categories, setCategories] = useState(()=>{
    const initialCategories = getCategories(0,50);
    return initialCategories
  });

  useEffect(() => {
    categories.then(function(value){
      setCategoryState(value);
      setCategoryLoading(false);
    });
  });*/
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

  //const data = await getProduct(1);
  //console.log(data)
  //const { initialData } = props;


  //onFetchNewData("");
  //console.log("data í cat: ", data.items[1]);

  //const [product, setProduct] = useState("bla");


/*  useEffect(() => {
      const fetchProduct = async () => {
             const result = await getCategories(2,2);
             setProduct(result);
      }
    fetchProduct();
  }, []);*/

  /*async function onFetchNewData(name: string) {
     //setErTad(!erTad);
     /*setData(await getTodos(!erTad));*/
    /*const data = await getCategor();
    console.log("data blaaaa: ", data );
    //setProduct(data);

    return data.items;
  }
  //setProduct(true);
  onFetchNewData("");*/
//  console.log("þetta er product: ");
  //var data = await useEffect();

  /*async function fall(prod:IProduct | undefined){
   if(prod !== undefined){
      return <div>jamms</div>;}
   else{
     return '';}

  }*/
  /*console.log("da damm: ",product);
  return (

    <React.Fragment>
    <div>
    <p>categories</p>
    {product.map(function(item: any){
      <div>hæ</div>
    }

    )}
    </div>
    </React.Fragment>
  );*/

  /*if(categoryLoading){
    return(
      <div>Hæ</div>
    )
  }*/

  function und1(cat: ICategory[] | undefined) {
    if (cat !== undefined) {
      return (
        <div className="category__cards">
          {cat.map((item, i) => (
            <div key={i} className="category__card__container">

                <p>{item.title}</p>

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
      <div className="category__container">
        <h2>Skoðaðu vöruflokkana okkar</h2>
        {/*und1(categories)*/}
        {/*if(categories != undefined) {
          categories.map(function(item: any){
          <div>hæ</div>
        }

      )}*/}
      {und1(categories)}
      </div>
    )}
  </div>
);

/*  return (
    <div>
      <p>product</p>
    </div>
  );*/
}

/*CategoriesRoute.getInitialProps = async () => {
  console.log("hæ hæ")
  const data = await getProduct(1);

  return { initialData: data };
}*/
