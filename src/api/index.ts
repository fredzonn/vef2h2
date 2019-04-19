import { IProduct, ICategory,  IOrders } from './types';

// Sækja slóð á API úr en
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

async function getCategory(category: Number, search: string, offset: Number, limit: Number) : Promise<IProduct[]> {
  // todo sækja vöru
  console.log("ÞETTA ER CATEGORY: ",category)
  const url = new URL('/products'+'?offset='+offset+'&limit='+limit+'&category='+category+'&search='+search, baseurl);//new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href); // ?offset=${offset}&limit=${limit}
  const JSONgogn = response.json();
  const arr:IProduct[] = [];

  const cats = JSONgogn.then(function(data){
    console.log("gögn er þetta: ",data);
    data.items.forEach(function(element: { id: number; title: string; image: string; price:number; category_id: number; category_title: string }) {
      const product: IProduct = {
        category: {
          id: element.category_id,
          title: element.category_title,
        },
        id: element.id,
        image: element.image,
        price: element.price,
        title: element.title,
      };
      arr.push(product);
    });
    return arr;
  });
  return new Promise((resolve) => resolve(cats))
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

async function getOrders(category: Number, search: string, offset: Number, limit: Number) : Promise<IOrders[]> {
  // todo sækja vöru
  console.log("ÞETTA ER getOrders: ",category)
  const url = new URL('/orders', baseurl);//new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href); // ?offset=${offset}&limit=${limit}
  const JSONgogn = response.json();
  const arr: IOrders[] = [];

  const cats = JSONgogn.then(function(data){
    console.log("gögn er þetta: ",data);
    data.items.forEach(function(element: { id: number; name: string/*; image: string; price:number; category_id: number; category_title: string*/ }) {
      const product: IOrders = {
        id: element.id,
        name: element.name,
        address: "",
        //order_created: ,
        order_submitted: true,
        user: {
          id: 0,
          username: "string;",
          email: "string;",
          password: "string;",
          admin: false,
        },
      };
      arr.push(product);
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
  getCategory,
  getOrders,
  post,

};
