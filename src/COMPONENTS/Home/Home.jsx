import React, { useEffect } from "react";
import CardSection from "../CardSection/CardSection";
import Header from "../Header/Header";
import Works from "../Works/Works";
import Slider from "../Slider/Slider";
import Blog from "../Blogs/Blog";
import "./Home.css";
import { Outlet } from "react-router-dom";
import backgroundImage from "../../allground.jpg";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../helper";



const Home = () => {
  return (
    <>
      <div
        className="background-container"
        // className="background-container"
        // style={{
        //   backgroundImage: `url(${backgroundImage})`,
        // }}
      >
        <Outlet></Outlet>
        <Header />
        <Works />
        <CardSection />
        <Slider />
        <Blog />
      </div>
      
    </>
  );
};

export default Home;
