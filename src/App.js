import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './COMPONENTS/Home/Home';
import Shelters from './COMPONENTS/Shelters/Shelter';
import Login from './COMPONENTS/Login/Login';
import Blogging from './COMPONENTS/Blogging/Blogging';
import Navbar from './COMPONENTS/NavBar/NavBar';
import Services from './COMPONENTS/Services/Services';
import User from './COMPONENTS/User/User';
import Clinc from './COMPONENTS/Clinc/Clinc';
import ClientForm from './COMPONENTS/ClientForm/ClientForm';
import UserForm from './COMPONENTS/UserForm/UserForm';
import Shop from './COMPONENTS/Shop/Shop';
import ShopContextProvider from './context/shop-context';
import Cart from "./COMPONENTS/cart/cart";
import ApiContextProvider from './context/api-context';

const App = () => {
  return (
    <div className="background-container">
      <Navbar />
      <ShopContextProvider>
      <ApiContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogging" element={<Blogging />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clinc" element={<Clinc />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/clientform" element={<ClientForm />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart"element={<Cart/>}/>
      </Routes>
      </ApiContextProvider>
      </ShopContextProvider>
    </div>
  );
};

export default App;
