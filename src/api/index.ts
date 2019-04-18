import { IProduct } from './types';

// Sækja slóð á API úr env
const baseurl: string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string): Promise<IProduct> {
  const url = new URL('/', baseurl);
  const response = await fetch(url.href)
  const data = await response.json();

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
  getProduct, post
};
