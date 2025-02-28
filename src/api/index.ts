import { IProduct, ICategory } from './types';

// Sækja slóð á API úr en
const baseurl: string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(product: Number): Promise<IProduct> {
  // todo sækja vöru
  const url = new URL('/products/' + product, baseurl);//new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();

  const prod = JSONgogn.then(function (data) {

    const product: IProduct = {
      category: {
        id: data.category_id,
        title: data.category_title,
      },
      id: data.id,
      image: data.image,
      price: data.price,
      title: data.title,
      description: data.description,
    };
    return product;
  });
  return new Promise((resolve) => resolve(prod))
}

async function getCategories(offset: Number, limit: Number): Promise<ICategory[]> {
  // todo sækja vöru
  const url = new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr: ICategory[] = [];

  const cats = JSONgogn.then(function (data) {
    data.items.forEach(function (element: { id: number; title: string; }) {
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


async function getProducts(offset: Number, limit: Number): Promise<IProduct[]> {
  const url = new URL('/products/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href);
  const JSONgogn = response.json();
  const arr: IProduct[] = [];

  const prods = JSONgogn.then(function (data) {
    data.items.forEach(function (element: { id: number; title: string; price: number; image: string; category: ICategory; }) {
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

async function getCategory(category: Number, search: string, offset: Number, limit: Number): Promise<IProduct[]> {
  // todo sækja vöru
  const url = new URL('/products' + '?offset=' + offset + '&limit=' + limit + '&category=' + category + '&search=' + search, baseurl);//new URL('/categories/', baseurl);//(/categories?offset=${offset}&limit=${limit},baseurl);
  const response = await fetch(url.href); // ?offset=${offset}&limit=${limit}
  const JSONgogn = response.json();
  const arr: IProduct[] = [];

  const cats = JSONgogn.then(function (data) {
    data.items.forEach(function (element: { id: number; title: string; image: string; price: number; category_id: number; category_title: string }) {
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



interface options {
  body?: any;
  headers: any;
  method?: string;
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

async function get(endpoint: string) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options: options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  const result = await response.json();

  return { result, status: response.status };
}

async function deleteID(endpoint: string) {
  const url = `${baseurl}${endpoint}`;

  const options: options = {
    headers: {
      'content-type': 'application/json'
    },
    method: 'DELETE',
  }
  const token = window.localStorage.getItem('token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  await fetch(url, options);

}


export {
  getProduct,
  getProducts,
  getCategories,
  getCategory,
  post,
  get,
  deleteID
};
