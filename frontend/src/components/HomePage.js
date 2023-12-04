import React from 'react';
import Header from './Header';
import Notes from './Notes';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  return (
    <div className='container'>
      <Header />
      <Notes />
    </div>
  );
};

export default HomePage;