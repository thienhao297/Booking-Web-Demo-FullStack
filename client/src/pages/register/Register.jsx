import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";

const Register = () => {
  const [registers, setRegisters] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisters((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        registers
      );
      if (res) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login">
        <div className="lContainer">
          <h1 className="lTitle">REGISTER</h1>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Fullname"
            id="fullName"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Phone Number"
            id="phoneNumber"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
