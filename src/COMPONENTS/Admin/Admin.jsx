import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProductsTable from './products-table';
import UsersTable from './users-table';
import ServicesTable from './services-table';
import Navtest from '../NavBar/NavBar';

// import Blogs from './COMPONENTS/Admin/Blogs';

const Admin = () => {
  return (
    <div >
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 className='m-3'>Admin Dashboard</h1>
      <button className='btn btn-danger m-3 '><Link to="users" className='text-decoration-none text-white'>Users</Link></button>
      <button className='btn btn-danger m-3'><Link to="products"className='text-decoration-none text-white'>products</Link></button>
      <button className='btn btn-danger m-3'><Link to="services"className='text-decoration-none text-white'>services</Link></button>
      <Routes>
        <Route path="products" element={<ProductsTable/>} />
        <Route path="users" element={<UsersTable/>} />
        <Route path="services" element={<ServicesTable/>} />
        {/* <Route path="/admin/blogs" element={<Blogs />} /> */}
      </Routes>
    </div>
  );
};

export default Admin;