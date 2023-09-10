import Sidebar from "../../components/sidebar/Sidebar";
import DashBoard from "../../components/table/Dashboard";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <DashBoard />
        </div>
      </div>
    </div>
  );
};

export default Home;
