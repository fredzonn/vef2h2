import React, { useState, useEffect } from 'react';
import { getProduct, getCategories, getCategory, getOrders } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Helmet from 'react-helmet';
import './Orders.scss';

export default function Orders() {
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fyrirsogn, setFyrirsogn] = useState("Fyrirsogn");
  const [offset, setOffset] = useState(0);
  const [erEndir, setErEndir] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getOrders(3, "", 0, 12);
      //console.log("þetta er final countdown: ",result[1].category.title);
      /*setFyrirsogn(result[1].category.title);
      setCategories(result);*/
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <p>orders</p>
  );
}
