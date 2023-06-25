/** @format */

import React, { useState, useEffect } from "react";
import "./Shelter.css";
import headerImage from "../../images/adopt1.webp";
import headerImageHover from "../../images/adopt2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { CONSTANTS } from "../../constants";
import axios from "axios";
import { constants } from "../../constants";

// const jsonPort = CONSTANTS.JSON_SERVER.PORT;
// const baseURL = 'http://localhost:'+jsonPort+'/Shelters';

// const jsonPort = CONSTANTS.JSON_SERVER.PORT;
const jsonPort = constants.JSON_SERVER.PORT;
const baseURL = "http://localhost:" + jsonPort + "/Shelters";

const Shelters = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [shelterCard, setShelterCard] = useState([]);
  const [showOnlyDogCards, setShowOnlyDogCards] = useState(false);
  const [showOnlyCatCards, setShowOnlyCatCards] = useState(false);

  const handleClickDog = () => {
    setShowOnlyDogCards(true);
    setShowOnlyCatCards(false);
  };

  const handleClickCat = () => {
    setShowOnlyCatCards(true);
    setShowOnlyDogCards(false);
  };

  const handleClickAll = () => {
    setShowOnlyDogCards(false);
    setShowOnlyCatCards(false);
  };

  const filteredShelterCards = shelterCard.filter((shelter) => {
    if (showOnlyDogCards && shelter.animal_type === "dog") {
      return true;
    }
    if (showOnlyCatCards && shelter.animal_type === "cat") {
      return true;
    }
    if (!showOnlyDogCards && !showOnlyCatCards) {
      return true;
    }
    return false;
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // useEffect(() => {
  //   fetch("http://localhost:4001/shelters")
  //     .then((res) => res.json())
  //     .then((data) => setShelterCard(data));
  // }, []);
  useEffect(() => {
    axios
      .get("http://ah.khaledfathi.com/api/service/filter/service_type/shelter")
      .then((res) => {
        
        setShelterCard(res.data.data);
        
      });
  }, []);

  return (
    <div className="Shelters ">
      <div
        className="shelterscover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={isHovered ? headerImageHover : headerImage}
          alt="Header"
          className="responsive-image w-100"
        />
      </div>
      <div className="container">
        <div
          className="icon-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <section>
            {/* <div
              className="graph__wrapper"
              style={{ width: "70%", height: "auto" }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 315 107"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  sketchType="MSPage"
                >
                  <path
                    id="Path-1"
                    className="path"
                    fill="none"
                    stroke="#ff642e"
                    strokeWidth="5"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81"
                  />
                  <path
                    className="dashed"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81"
                  />

                  <polyline
                    id="arrow"
                    points="0,-9 18,0 0,9 5,0"
                    fill="#ff642e"
                  >
                    <animateMotion
                      rotate="auto"
                      begin="1s"
                      dur="1.6s"
                      repeatCount="1"
                      fill="freeze"
                    >
                      <mpath xlinkHref="#Path-1" />
                    </animateMotion>
                  </polyline>
                </g>
              </svg>
            </div> */}

            <img
              className="CatImg"
              style={{ cursor: "grab", width: "65%", marginTop: "45px" }}
              onClick={handleClickCat}
              src="./Images/cat.webp"
              alt="Cat Icon"
            />
          </section>

          <h3
            className="SHhead"
            style={{
              marginRight: "2rem",
              fontSize: "2.5vw",
              textAlign: "center",
            }}
          >
            Click to Choose your New Friend
            <br />
            <span
              onClick={handleClickAll}
              style={{
                cursor: "pointer",
                marginTop: "1rem",
                color: "#ff642e",
                fontSize: "1.7vw",
                display: "block",
              }}
            >
              Or Both
            </span>
          </h3>

          <section>
            <img
              style={{
                cursor: "pointer",
                width: "85%",
                marginTop: "3rem",
                marginLeft: "3rem",
              }}
              onClick={handleClickDog}
              src="./Images/dog.webp"
              className="doggimage"
              alt="Dog Icon"
            />
          </section>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {filteredShelterCards.map((shelter, index) => (
            <div
              className="shelterCard col-lg-4 col-md-6 col-sm-12 justify-content-center"
              key={index}
            >
              <a className="card">
                <img
                  src={"http://ah.khaledfathi.com/" + shelter.image}
                  className="card__image"
                  alt=""
                />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg
                      className="card__arc"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path />
                    </svg>
                    <img
                      className="card__thumb"
                      src={"http://ah.khaledfathi.com/" + shelter.image}
                      alt=""
                    />
                    <div className="card__header-text">
                      <h3 className="card__title">{shelter.name}</h3>
                    </div>
                  </div>
                  <p className="card__description">{shelter.description}</p>
                  <p className="cardMoreInfo1">{shelter.address}</p>
                  <p className="cardMoreInfo2">
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{ marginRight: "10px" }}
                    />
                    {shelter.phone}
                  </p>{" "}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shelters;
