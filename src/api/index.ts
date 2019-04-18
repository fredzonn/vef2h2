import { IProduct, ICategory } from './types';
import { number } from 'prop-types';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;
console.log(baseurl);

async function getProduct(id: number | string) : Promise<IProduct> {
  const url = new URL('/products/'+id, baseurl);
  const response = await fetch(url.href)
  const data = await response.json();
  console.log("data úr index.ts: ",data);

  const product: IProduct = {
    category: {
      id: 10,
      title: "Flokkur",
    },
    id: data.id,
    image: data.image,
    price: data.price,
    title: data.title,
  };

  return product;
}

async function getProducts(offset:Number, limit:Number) : Promise<IProduct[]> {
  const url = new URL('/products/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr:IProduct[] = [];

  const prods = JSONgogn.then(function(data){
    console.log("datað er þetta: ",data);
    data.items.forEach(function(element: { id: number; title: string; price: number; image: string; category: ICategory; }) {
      const products: IProduct = {
        id: element.id,
        title: element.title,
        price: element.price,
        image: element.image,
        category: element.category,
      };
      arr.push(products);
    });
    return arr;
  });
  return new Promise((resolve) => resolve(prods))
}

async function getCategor(/*id: number | string |undefined*/) /*: Promise<ICategory[]>*/ {
  const url = new URL('/categories', baseurl);
  const response = await fetch(url.href)
  const data = await response.json();
  //console.log("data úr index.ts: ",data.items);

  //const prods: ICategory[] = await response.json();
  //console.log("prod er: ", data.items);
  /*const product: ICategory = {
    id: data.items[1].id,
    title: data.items[1].title,
  };
  console.log("product: ", product);*/
  return data;
}

/*async function getCategories(offset:Number, limit:Number) : Promise<ICategory[]> {
  // todo sækja vöru
  const url = new URL('/categories/'+1, baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr:ICategory[] = [];

  const cats = JSONgogn.then(function(data){
    cats.forEach(function(element: { id: number; title: string; }) {
      const category: ICategory = {
        id: element.id,
        title: element.title,
      };
      arr.push(category);
    });
    return arr;
  });
  return new Promise((resolve) => resolve(cats))
}*/

async function getCategories(offset:Number, limit:Number) : Promise<ICategory[]> {
  // todo sækja vöru
  const url = new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr:ICategory[] = [];

  const cats = JSONgogn.then(function(data){
    console.log("datað er þetta: ",data);
    data.items.forEach(function(element: { id: number; title: string; }) {
      const category: ICategory = {
        id: element.id,
        title: element.title,
      };
      arr.push(category);
    });
    return arr;
  });
  return new Promise((resolve) => resolve(cats))
}

async function getCategory(category:String) : Promise<ICategory[]> {
  // todo sækja vöru
  const url = new URL('/products/'+'?category'+"'"+category+"'", baseurl);//new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr:ICategory[] = [];

  const cats = JSONgogn.then(function(data){
    console.log("gögn er þetta: ",data);
    data.items.forEach(function(element: { id: number; title: string; }) {
      const category: ICategory = {
        id: element.id,
        title: element.title,
      };
      arr.push(category);
    });
    return arr;
  });
  return new Promise((resolve) => resolve(cats))
}

interface options {
  body: any;
  headers: any;
  method: string;
}

async function post(endpoint: string, data: any) {
  const url = `${baseurl}${endpoint}`;

  const options: options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const token = window.localStorage.getItem('token');

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  const result = await response.json();

  return { result, status: response.status };
}

export {
  getProduct,
  getProducts,
  getCategories,
  getCategor,
  getCategory,
  post,

};
