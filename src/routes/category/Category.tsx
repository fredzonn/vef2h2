import React, { useState, useEffect } from 'react';
import { getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Helmet from 'react-helmet';
import '../home/Home.scss';

export default function Category(props: any) {
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fyrirsogn, setFyrirsogn] = useState("Fyrirsogn");
  const [offset, setOffset] = useState(0);
  const [erEndir, setErEndir] = useState(false);
  var parts = props.location.pathname.split('/');
  var id = parts.pop();
  id = parseInt(id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCategory(id, "", offset, 12);
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

        <div className="Hproducts">

          {categories.map((data, i) => (
            <div key={i} className="Hproduct">
              <div className="Hproduct__item" key={data.id || i} onClick={() => onClick4(data.id)}>
                <img className="img-responsive" src={data.image} alt="logo"/>
                <div className = "Hdesc">
                  <p>{data.title}</p>
                  <div>{data.category.title}</div>
                  <div>{data.price}</div>
                </div>
              </div>
            </div>
          ))}

        </div>

      );;
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
    setLoading(true);
    const result = await getCategory(id,search,offset, 12);
    setCategories(result);
    setLoading(false);
    return
  }

  async function onClick2() {
    setOffset(offset+12);
    setLoading(true);
    const result = await getCategory(id,search, offset+12, 12);
    if(result.length===0){
      setErEndir(true);
    }else{
      setErEndir(false);
    }
    setCategories(result);
    setLoading(false);
    return
  }

  async function onClick3() {
    setOffset(offset-12);
    setLoading(true);
    const result = await getCategory(id,search, offset-12, 12);
    if(result.length===0){
      setErEndir(true);
    }else{
      setErEndir(false);
    }
    setCategories(result);
    setLoading(false);
    return
  }

  function onChange(value: string) {
    console.log(value);
  }

  function change(event: React.FormEvent<HTMLInputElement>) {
        // No longer need to cast to any - hooray for react!
        var safeSearchTypeValue: string = event.currentTarget.value;
        setSearch(safeSearchTypeValue);
    }

  return (
  <div className="Hcontainer">
  <Helmet title="Flokkar" />
    {loading && (
        <h2 className="loading">Hleð gögnum...</h2>
    )}
    {!loading && (
      <div className="Hhaldari">
        <h2>{fyrirsogn}</h2>
        <input className={"v"} /*type={type}*/ onChange={e => change(e)}/>
        <button className={"v"} onClick={onClick}>Leita</button>
        {fall(categories)}
        {fall2()}
      </div>
    )}
  </div>
);

}
