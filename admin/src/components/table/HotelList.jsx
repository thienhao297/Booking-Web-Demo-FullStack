import "./test.scss";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const HotelList = () => {
  const { data } = useFetch(`http://localhost:5000/api/hotels`);
  const navigate = useNavigate();

  const handleDelete = async (id, name) => {
    const res = await axios.get(`http://localhost:5000/api/trans`);
    try {
      const result = window.confirm("Are you sure?");

      const existHolelTrans = await res.data
        .map((item) => item.hotel)
        .includes(name);

      if (result) {
        if (existHolelTrans) {
          window.alert("Hotel is being booked");
        } else {
          const res = await axios.delete(
            `http://localhost:5000/api/hotels/${id}`
          );
          if (res) {
            navigate("/");
          }
        }
      }
    } catch (err) {}
  };

  const hotelColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 320,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/hotels/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, params.row.name)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={hotelColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default HotelList;
