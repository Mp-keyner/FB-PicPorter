import React from 'react';
import Nav from '../Nav/index';
import {db} from '../../firebase';

const Layout = ({ children }) => {
  const addOredit = async (link) => {
    console.log('new task added');
    await db.collection('link').doc().set(link);
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
