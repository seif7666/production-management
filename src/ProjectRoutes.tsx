import React from 'react';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import { LINKS } from './constants';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage';
const ProjectRouters = () => {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path={LINKS.addProduct} element={<AddProduct />} />
    </Routes>
    </BrowserRouter>
  )
};

export default ProjectRouters
