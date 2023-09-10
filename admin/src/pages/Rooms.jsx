import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import RoomList from "../components/table/RoomList";

const Rooms = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="datatableTitle">
            <h2 className="listTitle">Rooms List</h2>
            <Link to={`/rooms/new`} className="link">
              Add New
            </Link>
          </div>
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
