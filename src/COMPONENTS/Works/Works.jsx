import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./Works.css";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Works.css";
import AOS from "aos";
import "aos/dist/aos.css";

//component
const Works = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className="worksSection pt-5 mt-5">
      <div className="container">
        <div className="background-layer">
          <div className="row">
            <div className="col-12 text-center"></div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              <h4 className="iconHead">
                {" "}
                {t("How")} <span className="workspan"> {t("it Works")}</span>{" "}
              </h4>
            </div>
          </div>
        </div>

        <div className="workCards">
          <div className="cards-work row">
            <div
              className="cardd red col-lg-4 col-md-6 col-sm-12"
              data-aos="fade-up"
            >
              <img
                src="Images/search.webp"
                alt="Image 1"
                className="F-img"
              />
              <h3 className="works-title"> {t("Search Services")}</h3>
              <p className="works-description">
                {t(
                  "Find what you're looking for with our efficient search services."
                )}
              </p>
            </div>
            <div
              className="cardd blue col-lg-4 col-md-6 col-sm-12"
              data-aos="fade-up"
            >
              <img
                src="Images/book.webp"
                alt="Image 2"
              />
              <h3 className="works-title">{t("Book & Pay")}</h3>
              <p className="works-description">
                {t(
                  "Simplify your booking and payment process with our intuitive system."
                )}
              </p>
            </div>
            <div
              className="cardd green col-lg-4 col-md-6 col-sm-12"
              data-aos="fade-up"
            >
              <img
                src="Images/relax.webp"
                alt="Image 3"
              />
              <h3 className="works-title">{t("Relax")}</h3>
              <p className="works-description">
                {t(
                  "Effortless searching, smooth payments, relaxation as easy as breathing."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
