import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data: hotelInfo } = useFetch(
    `http://localhost:5000/api/hotels/find/${id}`
  );

  const [info, setInfo] = useState();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo(hotelInfo);
  }, [hotelInfo]);

  const { data: selectRooms, loading } = useFetch(
    "http://localhost:5000/api/rooms"
  );

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
      const editHotel = {
        ...info,
        photos: info.photos,
        rooms,
      };
      const res = await axios.put(
        `http://localhost:5000/api/hotels/${id}`,
        editHotel
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
          <h1>Edit Hotel</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Name</label>
                <input
                  id="name"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.name}
                />
              </div>
              <div className="formInput">
                <label>Type</label>
                <input
                  id="type"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.type}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  id="city"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.city}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  id="address"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.address}
                />
              </div>
              <div className="formInput">
                <label>Distance from City Center</label>
                <input
                  id="distance"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.distance}
                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.title}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="desc"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.desc}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  id="cheapestPrice"
                  onChange={handleChange}
                  type="text"
                  defaultValue={hotelInfo.cheapestPrice}
                />
              </div>

              <div className="formInput">
                <label htmlFor="file">Images:</label>
                <input
                  type="text"
                  id="imageUrl"
                  onChange={handleChange}
                  defaultValue={hotelInfo.photos}
                />
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
                    : selectRooms &&
                      selectRooms.map((room) => (
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
export default EditHotel;
