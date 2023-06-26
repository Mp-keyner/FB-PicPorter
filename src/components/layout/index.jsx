import React from 'react';
import Nav from '../Nav/index';
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore"; 



const Layout = ({ children }) => {
  const addOredit = async (link) => {
    console.log('new task added');
    try {
      const docRef = await addDoc(collection(db, "Images"), link);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { addOredit });
    }
    return child;
  });

  return (
    <>
      <Nav />
      {childrenWithProps}
    </>
  );
};

export default Layout;
