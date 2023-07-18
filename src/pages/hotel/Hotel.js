import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Detail from "../../data/detail.json";
import { useState } from "react";

const Hotel = () => {
  const [slideNum, setSlideNum] = useState(0);
  const [open, setOpen] = useState(false);
  const detailHotel = Detail;

  const handleOpen = (i) => {
    setSlideNum(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSliceNumber;
    if (direction === "left") {
      newSliceNumber = slideNum === 0 ? 5 : slideNum - 1;
    } else {
      newSliceNumber = slideNum === 5 ? 0 : slideNum + 1;
    }
    setSlideNum(newSliceNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("left")}
            />
            <div className="sliderWrapper">
              <img
                src={detailHotel.photos[slideNum]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("right")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{detailHotel.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{detailHotel.address}</span>
          </div>
          <span className="hotelDistance">{detailHotel.distance}</span>
          <span className="hotelPriceHighlight">{detailHotel.price}</span>
          <div className="hotelImages">
            {detailHotel.photos.map((img, index) => (
              <div className="hotelImgWrapper" key={index}>
                <img
                  onClick={() => handleOpen(index)}
                  src={img}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
              <h1 className="hotelTitle">{detailHotel.title}</h1>
              <p className="hotelDesc">{detailHotel.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score at 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
