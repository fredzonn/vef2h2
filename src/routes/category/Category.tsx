import React, { useState, useEffect } from 'react';
import { getProduct, getCategories, getCategor, getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Helmet from 'react-helmet';

export default function Category(/*{props} : { props: any}*/props: any) {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  var parts = props.location.pathname.split('/');
  var id = parts.pop();
  id = parseInt(id);
  console.log("þetta er vitlaust?: ",id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCategory(id);
      console.log("þetta er final countdown: ",result);
      setCategories(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  //const { id } = props;

  //text = 'Something -that - has- dashes - World';
  /*var parts = props.location.pathname.split('/');
  var id = parts.pop();
  console.log("balsam: ",parts,id);*/

  /*var id = props.location.pathname[props.location.pathname.length -1];
  id = parseInt(id);
  console.log(props.location.pathname, id);
  console.log("true?: ",id===9);*/
  //Category.getInitialProps();

  /*return (
    <p>category</p>
  )*/

  function fall(categories: IProduct[] | undefined) {
    if (categories !== undefined) {
      return (

        <div className="products">

          {categories.map((data, i) => (
            <div key={i} className="product">

                <img className="img-responsive" src={data.image} alt="logo"/>
                <p>{data.title}</p>
                <div>{data.category.title}</div>
                <div>{data.price}</div>


            </div>
          ))}

        </div>

      );;
    } else {
      return '';
    }
  }

  return (
  <div className="container">
  <Helmet title="Flokkar" />
    {loading && (
        <h2 className="loading">Hleð gögnum...</h2>
    )}
    {!loading && (
      <div className="haldari">
        <h2>Skoðaðu vöruflokkana okkar</h2>
        {fall(categories)}
      </div>
    )}
  </div>
);

}

/*Category.getInitialProps = async ({query} : { query: any}) => {
  const{index} = query;
  //const todo = await getCategory(index);
  console.log("loggi logg")

  return { index };
}*/

/*function Home(props) {

  const { todo,id } = props;
  console.log(todo)
  return (
    <Layout title =  {todo.title}>
     <TodoDetail
       todo={todo}
     />

   </Layout>
  );
}*/
/*Home.getInitialProps = async ({ query }) => {
  const{id} = query;
  const todo = await getCategory(id);
  console.log("loggi logg")

  return { id, todo };
}*/
