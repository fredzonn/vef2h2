import React, { useState, useEffect } from 'react';
import { getProduct, getCategories, getCategor, getCategory } from '../../api/index';

export default function Category({props} : { props: any}) {

  //const { index } = props;
  /*console.log(props);
  Category.getInitialProps();
  return (
    <p>category</p>
  )*/
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
