import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const { data, loading } = useFetch("http://localhost:5000/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        !info.name ||
        info.name === "" ||
        !info.type ||
        info.type === "" ||
        !info.city ||
        info.city === "" ||
        !info.address ||
        info.address === "" ||
        !info.distance ||
        info.distance === "" ||
        !info.title ||
        info.title === "" ||
        !info.desc ||
        info.desc === "" ||
        !info.cheapestPrice ||
        info.cheapestPrice === "" ||
        rooms.length === 0
      ) {
        window.alert("Please fill out the form above completely!");
        return;
      }
      const newhotel = {
        ...info,
        rooms,
      };

      const res = await axios.post(
        "http://localhost:5000/api/hotels",
        newhotel
      );
      if (res) {
        navigate("/hotels");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label htmlFor="file">Images:</label>
                <input type="text" id="photos" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewHotel;
