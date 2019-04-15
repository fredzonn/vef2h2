import { IProduct, ICategory } from './types';

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
async function getCategories(id: number | string |undefined)/* : Promise<ICategory>*/ {
  const url = new URL('/categories/'+id, baseurl);
  const response = await fetch(url.href)
  const data = await response.json();
  //console.log("data úr index.ts: ",data.items);

  //const prods: ICategory = await response.json();
  console.log("prod er: ", data.items);
  /*const product: ICategory = {
    id: data.items[1].id,
    title: data.items[1].title,
  };
  console.log("product: ", product);*/
  return data;
}

export {
  getProduct,
  getCategories,

};
