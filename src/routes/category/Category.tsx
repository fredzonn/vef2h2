import React, { useState, useEffect } from 'react';
import { getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Helmet from 'react-helmet';

import './Category.scss';

export default function Category(/*{props} : { props: any}*/props: any) {
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fyrirsogn, setFyrirsogn] = useState("Fyrirsogn");
  const [offset, setOffset] = useState(0);
  const [erEndir, setErEndir] = useState(false);
  var parts = props.location.pathname.split('/');
  var id = parts.pop();
  id = parseInt(id);
  console.log("þetta er vitlaust?: ",id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCategory(id, "", offset, 12);
      console.log("þetta er final countdown: ",result[1].category.title);
      setFyrirsogn(result[1].category.title);
      setCategories(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function onClick4(index: Number) {
    return location.href = location.origin+"/product/"+index;
  }

  function fall(categories: IProduct[] | undefined) {
    if (categories !== undefined) {
      return (

        <div className="Pcategory">

          {categories.map((data, i) => (
            <div key={i} className="Pproduct" onClick={() => onClick4(data.id)}>
            
              <img className="img-responsive" width="450" height="300" src={data.image} alt="logo"/>
                <div className = "Pdesc">
                  <div className = "left">
                    <h1>{data.title}</h1>
                    <p>{data.category.title}</p>
                  </div>
                  <h2>{data.price} kr.-</h2>
                </div>
            </div>
          ))}
        </div>
      );
    } else {
      return '';
    }
  }

  function fall2() {
    if (offset===0) {
      return (

        <div className="paging">
          <div>Síða {1+(offset/12)}</div>
          <button className={"v"} onClick={onClick2}>Næsta síða</button>
        </div>

      );
    } else if(erEndir===true){
      return (
        <div className="paging">
          <button className={"v"} onClick={onClick3}>Fyrri síða</button>
          <div>Síða {1+(offset/12)}</div>
        </div>
      );
    }else{
      return(
        <div className="paging">
          <button className={"v"} onClick={onClick3}>Fyrri síða</button>
          <div>Síða {1+(offset/12)}</div>
          <button className={"v"} onClick={onClick2}>Næsta síða</button>
        </div>
      );
    }
  }

  async function onClick() {
    console.log("search: ",search);
    setLoading(true);
    const result = await getCategory(id,search,offset, 12);
    console.log("þetta er final countdown: ",result);
    setCategories(result);
    setLoading(false);
    return //location.href = "categories/"+index;
  }

  async function onClick2() {
    setOffset(offset+12);
    console.log("all set: ",offset);
    setLoading(true);
    const result = await getCategory(id,search, offset+12, 12);
    if(result.length===0){
      setErEndir(true);
    }else{
      setErEndir(false);
    }
    console.log("þetta er final countdown: ",result.length);
    setCategories(result);
    setLoading(false);
    return //location.href = "categories/"+index;
  }

  async function onClick3() {
    setOffset(offset-12);
    console.log("all set: ",offset);
    setLoading(true);
    const result = await getCategory(id,search, offset-12, 12);
    if(result.length===0){
      setErEndir(true);
    }else{
      setErEndir(false);
    }
    console.log("þetta er final countdown: ",result.length);
    setCategories(result);
    setLoading(false);
    return //location.href = "categories/"+index;
  }

  function onChange(value: string) {
    console.log(value);
  }



  function change(event: React.FormEvent<HTMLInputElement>) {
        // No longer need to cast to any - hooray for react!
        var safeSearchTypeValue: string = event.currentTarget.value;
        setSearch(safeSearchTypeValue);
        console.log(safeSearchTypeValue,search); 

    
        console.log(search);
    }

  return (
  <div className="container">
  <Helmet title="Flokkar" />
    {loading && (
        <h2 className="loading">Hleð gögnum...</h2>
    )}
    {!loading && (
      <div className="Phaldari">
        <h2>{fyrirsogn}</h2>
        Leita: <input className={"v"} /*type={type}*/ onChange={e => change(e)}/>
        <button className={"v"} onClick={onClick}>Leita</button>
        {fall(categories)}
        {fall2()}
      </div>
    )}
  </div>
);

}


