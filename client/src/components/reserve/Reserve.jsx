import { DateRange } from "react-date-range";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [totalPricePerDay, setTotalPricePerDay] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const paymentRef = useRef();

  const navigate = useNavigate();

  const { data } = useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);

  const { user } = useContext(AuthContext);
  const { dates } = useContext(SearchContext);

  const [adates, setAdates] = useState(dates);

  const getDatesInRangeTest = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldatesTest = getDatesInRangeTest(
    adates[0].startDate,
    adates[0].endDate
  );

  const isAvailableTest = (roomNumber) => {
    let isFound = false;

    if (roomNumber.unavailableDates.length > 0) {
      roomNumber.unavailableDates.flat().forEach((date) => {
        if (alldatesTest.includes(date)) {
          isFound = true;
        }
      });
    }

    return isFound;
  };

  const handleSelect = (e, price, number) => {
    const checked = e.target.checked;
    const value = e.target.value;

    if (checked) {
      setTotalPricePerDay(totalPricePerDay + price);
    } else {
      setTotalPricePerDay(totalPricePerDay - price);
    }

    setRoomNumbers(
      checked
        ? [...roomNumbers, number]
        : roomNumbers.filter((item) => item !== number)
    );

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(adates[0]?.endDate, adates[0]?.startDate) || 1;

  const handleClick = async () => {
    const paymentValue = paymentRef.current.value;
    try {
      const res = await axios.post(`http://localhost:5000/api/trans`, {
        user: { name: user.username, userId: user._id },
        hotel: hotelId,
        room: roomNumbers,
        dateStart: adates[0].startDate.getTime(),
        dateEnd: adates[0].endDate.getTime(),
        price: totalPricePerDay * days,
        payment: paymentValue,
      });

      if (!res) {
        return;
      }

      if (selectedRooms.length > 0) {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(
              `http://localhost:5000/api/rooms/availability/${roomId}`,
              {
                dates: alldatesTest,
              }
            );
            return res.data;
          })
        );
        setOpen(false);
        navigate("/transaction");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rForm">
        <div className="rContainer">
          <h2>Dates</h2>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setAdates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={adates}
            minDate={new Date()}
          />
        </div>
        <div className="rInfo">
          <h2>Reserve Info</h2>
          <form>
            <div>
              <label>Your Full Name</label>
              <div className="mb">
                <input
                  className="rInput"
                  type="text"
                  defaultValue={user.fullName}
                />
              </div>
              <label>Your Email</label>
              <div className="mb">
                <input
                  className="rInput"
                  type="email"
                  defaultValue={user.email}
                />
              </div>
            </div>
            <div>
              <label>Your Phone Number</label>
              <div className="mb">
                <input
                  className="rInput"
                  type="text"
                  defaultValue={user.phoneNumber}
                />
              </div>
            </div>
            <div>
              <label>Your Identity Card Number</label>
              <div className="mb">
                <input
                  className="rInput"
                  type="text"
                  placeholder="Card Number"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="rContainer">
        <h2>Select Rooms:</h2>
        <div className="rGrid">
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}$</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber, i) => (
                  <div className="room" key={i}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={(e) =>
                        handleSelect(e, item.price, roomNumber.number)
                      }
                      disabled={isAvailableTest(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h1>Total Bill: ${totalPricePerDay * days}</h1>
        <div className="rBill">
          <select
            ref={paymentRef}
            onChange={(event) => setPaymentMethod(event.target.value)}
            value={paymentMethod}
          >
            <option>Select Payment Method</option>
            <option>Credit Card</option>
            <option>Cash</option>
          </select>
          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
