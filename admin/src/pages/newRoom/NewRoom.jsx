import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const { data, loading } = useFetch("http://localhost:5000/api/hotels");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setHotelId(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        !info.title ||
        info.title === "" ||
        !info.desc ||
        info.desc === "" ||
        !info.price ||
        info.price === "" ||
        !info.maxPeople ||
        info.maxPeople === "" ||
        rooms.length === 0 ||
        hotelId === undefined
      ) {
        window.alert("Please fill out the form above completely!");
        return;
      }

      const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

      const res = await axios.post(
        `http://localhost:5000/api/rooms/${hotelId}`,
        {
          ...info,
          roomNumbers,
        }
      );
      if (res) {
        navigate("/rooms");
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
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="selectHotels">
                <label>Choose a hotel</label>
                <select id="hotelId" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.title}
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
export default NewRoom;
