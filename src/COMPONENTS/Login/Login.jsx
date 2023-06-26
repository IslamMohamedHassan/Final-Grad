import React, { useEffect, useState } from "react";
import styles from "./Login.module.css"; // Update the CSS file path
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../../context/API-Context";
import { setSession, getSession, removeSession, getCurrentTime } from "../../helper";
import { ajax } from "../../libCustomAjax_v1";

import { constants } from "../../constants";
import "./loginResult.css";
const URL = constants.API_HOST; 

//component
const Login = () => {
  /*******************/
  const redirect = useNavigate();
  const routeHome = () => {
    redirect("/");
  };
  useEffect(() => {
    if (getSession("login")) {
      routeHome();
    }
  }, []);

  /*******************/


  //Authentication
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }


  //data carier 
  const [loginMessage  , setLoginMessage]= useState(null); 
  const [loginWatingIndecator  , setLoginWatingIndecator]= useState(null); 
  //login request  
  const login = async (data) => {
    //view wating indicator
    setLoginWatingIndecator(true); 
    const response = await ajax(URL + "/api/auth/login", "POST", data);
    const newData = await response.json();
    if (newData.status) {//login success
      setLoginWatingIndecator(false); 
      setSession('login', true);
      setSession('auth', newData.record);
    }else {//fail to login 
      setLoginWatingIndecator(false); 
      setLoginMessage(newData.msg); 
    }
    /*************/
    const routeToHome = () => {
      redirect("/");
      window.location.reload();

    }
    if (getSession('login')) {
      routeToHome();
    }
    /*************/
  }

  //Event for login 
  const logInFun = async (e) => {
    e.preventDefault();
    await login(data);
  };

  return (
    <div className={styles.login}>

      <div className={styles["login-container"]}>
        <div className={`${styles["form-container"]} ${styles["login-form"]}`}>
          
            { loginWatingIndecator ? 
                <h4>Please Wait . . . </h4>:null
            }
            
            { loginMessage ? 
              <h4 style={{"color":"red" , "text-align":"center"}} >{loginMessage} </h4> : null
            }
          {/* ### End Khaled ########################################### */}

          <h2 className={styles.h2}>Login</h2>
          <form onSubmit={logInFun}>
            <div className={styles["form-group"]}>
              <label className={styles.label} htmlFor="userEmail">
                UserEmail
              </label>
              <input
                className={styles.input}
                type="text"
                id="userEmail"
                name="email"
                placeholder="Enter your userEmail"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
            <button className={styles.button} type="submit">
              Login
            </button>
          </form>
          <p style={{ marginTop: "40px" }}>
            Don't have an account? <Link to="/user">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
