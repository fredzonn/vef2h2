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

export {
  getProduct,
  getCategories,
  getCategor,

};
