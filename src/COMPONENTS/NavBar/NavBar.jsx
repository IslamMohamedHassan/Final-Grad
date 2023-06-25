import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getSession } from "../../helper";
import { useTranslation } from "react-i18next";

//component
const Navtest = () => {
  const [t, i18n] = useTranslation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid justify-content-end">
        <a className="navbar-brand" href="/">
          <img
            className="nav navimg"
            src="Images/logo-remo.png"
            alt="Description of the"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link
                className="nav-link active home-link"
                aria-current="page"
                to="/"
              >
                {t("Home")}
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("Services")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item " to="/clinc">
                    {t("Clincs")}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/shelters">
                    {t("Shelters")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/shop">
                {t("Shop")}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/Blogging">
                {t("Blog")}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
              </Link>
            </li>
            {getSession("login") ? (
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  <FontAwesomeIcon icon={faCircleUser} size="xl" />
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <FontAwesomeIcon icon={faCircleUser} size="xl" />
                </a>
              </li>
            )}
            {getSession("login") ? (
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                </a>
              </li>
            ) : (
              ""
            )}

            <li className="nav-item languages">
              {i18n.language === "en" && (
                <input
                  type="button"
                  value="EN"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                ></input>
              )}
              {i18n.language === "ar" && (
                <input
                  type="button"
                  value="AR"
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                ></input>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="languages">
        {i18n.language === "ar" && (
          <input
            type="button"
            value="AR"
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          ></input>
        )}
        {i18n.language === "en" && (
          <input
            type="button"
            value="EN"
            onClick={() => {
              i18n.changeLanguage("ar");
            }}
          ></input>
        )}
      </div> */}
    </nav>
  );
};

export default Navtest;
