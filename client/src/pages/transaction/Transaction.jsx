import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import "./Transaction.css";
const Transaction = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`http://localhost:5000/api/trans/${user._id}`);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const today = formattedDate(new Date());

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <div>
          <h3>Your Transactions</h3>
          <div>
            <table>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Room</th>
                  <th scope="col">Date</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {data.map((trans, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{trans.hotel}</th>
                    <th scope="row">{String(trans.room)}</th>
                    <th scope="row">
                      {trans.dateStart} - {trans.dateEnd}
                    </th>
                    <th scope="row">${trans.price}</th>
                    <th scope="row">{trans.payment}</th>
                    <th scope="row">
                      {today >= trans.dateStart && today <= trans.dateEnd
                        ? "CHECKIN"
                        : ""}
                      {today < trans.dateStart ? "BOOKED" : ""}
                      {today > trans.dateEnd ? "CHECKOUT" : ""}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Transaction;
