import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditRoom = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useFetch(`http://localhost:5000/api/rooms/${id}`);

  const [info, setInfo] = useState();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo(data);
    setRooms(data.roomNumbers?.map((room) => room.number));
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
        rooms.length === 0
      ) {
        window.alert("Please fill out the form above completely!");
        return;
      }

      let roomNumbers;

      if (typeof rooms == "string") {
        roomNumbers = rooms.split(",").map((room) => ({ number: room }));
      } else {
        roomNumbers = rooms.map((room) => ({ number: room }));
      }

      const res = await axios.put(`http://localhost:5000/api/rooms/${id}`, {
        ...info,
        roomNumbers,
      });
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
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Title</label>
                <input
                  id="title"
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.title}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="desc"
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.desc}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  id="price"
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.price}
                />
              </div>
              <div className="formInput">
                <label>Max People</label>
                <input
                  id="maxPeople"
                  type="number"
                  onChange={handleChange}
                  defaultValue={data.maxPeople}
                />
              </div>

              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  defaultValue={data.roomNumbers?.map((room) => room.number)}
                />
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditRoom;
