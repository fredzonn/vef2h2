import { IProduct, IApiResult } from './types';

import { useState, useEffect } from 'react';

export default function useApi<T>(apiCall: () => Promise<T>, defaultValue: T, deps: Array<any> = []) {
  const [items, setItems] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newItems = await apiCall();
        setItems(newItems);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchData();
  }, deps);

  return { items, loading, error};
}

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

export function mapProduct(item: any): IProduct {
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    image: item.image,
    created: new Date(item.created),
    updated: new Date(item.updated),
    category: {
      id: item.category_id,
      title: item.category_title,
    },
  }
}

async function getProduct(id: number | string) : Promise<IProduct> {
let result: IApiResult;

try{
  result = await get(`/products/${id}`);
} catch(e) {
  console.error('Error fetching product', e);
  throw new Error('Gat ekki sótt vöru');
}

if (result && !result.ok){
  const { data: { error = 'Gat ekki sótt vöru' } } = result;
  throw new Error(error);
}

return mapProduct(result.data);
}

export {
  getProduct,
  useApi,
};
