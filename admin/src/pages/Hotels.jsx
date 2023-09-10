import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import HotelList from "../components/table/HotelList";

const Hotels = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="datatableTitle">
            <h2 className="listTitle">Hotels List</h2>
            <Link to={`/hotels/new`} className="link">
              Add New
            </Link>
          </div>
          <HotelList />
        </div>
      </div>
    </div>
  );
};

export default Hotels;
