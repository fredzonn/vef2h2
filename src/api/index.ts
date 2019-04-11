import { IProduct } from './types';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string) : Promise<IProduct> {
  // todo sækja vöru
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

export {
  getProduct,
};
