import React, { useState, useEffect } from 'react';
import { getProduct, getCategories, getCategor, getCategory } from '../../api/index';

export default function Category(/*{props} : { props: any}*/props: any) {

  //const { id } = props;
  var id = props.location.pathname[props.location.pathname.length -1];
  console.log(props.location.pathname, id);
  //Category.getInitialProps();
  return (
    <p>category</p>
  )
}

Category.getInitialProps = async ({query} : { query: any}) => {
  const{index} = query;
  //const todo = await getCategory(index);
  console.log("loggi logg")

  return { index };
}



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
