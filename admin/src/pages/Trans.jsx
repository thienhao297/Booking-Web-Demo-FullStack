import Sidebar from "../components/sidebar/Sidebar";
import TransList from "../components/table/TransList";

const Trans = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="datatableTitle">
            <h2 className="listTitle">Transactions List</h2>
          </div>
          <TransList />
        </div>
      </div>
    </div>
  );
};

export default Trans;
