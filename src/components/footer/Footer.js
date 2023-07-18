import "./footer.css";
import listFooter from "../../data/footer.json";

const Footer = () => {
  const listF = listFooter;
  return (
    <div className="footer">
      <div className="fLists">
        {listF.map((list) => (
          <ul className="fList" key={list.col_number}>
            {list.col_values.map((val, index) => (
              <li className="fListItem" key={index}>
                {val}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="fText">Copyright 2022 Booking</div>
    </div>
  );
};

export default Footer;
