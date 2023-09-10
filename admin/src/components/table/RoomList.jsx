import "./test.scss";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RoomList = () => {
  const { data } = useFetch(`http://localhost:5000/api/rooms`);
  const navigate = useNavigate();

  const handleDelete = async (id, roomNumber) => {
    const res = await axios.get(`http://localhost:5000/api/hotels`);
    try {
      const result = window.confirm("Are you sure?");
      const listRoom = roomNumber.map(
        (item) => item.unavailableDates.length !== 0
      );
      let idHotel;
      await res.data.forEach((hotel) => {
        if (hotel.rooms.includes(id)) {
          idHotel = hotel._id;
        }
      });

      if (result) {
        if (listRoom.includes(true)) {
          window.alert("Room is being booked");
        } else {
          const res = await axios.delete(
            `http://localhost:5000/api/rooms/${id}/${idHotel}`
          );
          if (res) {
            navigate("/");
          }
        }
      }
    } catch (err) {}
  };

  const roomColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 350,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
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
              to={`/rooms/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() =>
                handleDelete(params.row._id, params.row.roomNumbers)
              }
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
        columns={roomColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default RoomList;
