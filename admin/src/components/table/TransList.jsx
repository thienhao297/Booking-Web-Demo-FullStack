import "./test.scss";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";

const TransList = () => {
  const { data } = useFetch(`http://localhost:5000/api/trans`);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const today = new Date().getTime();

  const hotelColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 50,
    },
    {
      field: "hotel",
      headerName: "Hotel",
      width: 250,
    },
    {
      field: "room",
      headerName: "Room",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 20,
    },
    {
      field: "payment",
      headerName: "Payment Method",
      width: 150,
    },
  ];

  const actionColumn = [
    {
      field: "dateStart",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <span
            className={`status ${
              today >= params.row.dateStart && today <= params.row.dateEnd
                ? "CHECKIN"
                : ""
            } ${today < params.row.dateStart ? "BOOKED" : ""} ${
              today > params.row.dateEnd ? "CHECKOUT" : ""
            }`}
          >
            {today >= params.row.dateStart && today <= params.row.dateEnd
              ? "CHECKIN"
              : ""}
            {today < params.row.dateStart ? "BOOKED" : ""}
            {today > params.row.dateEnd ? "CHECKOUT" : ""}
          </span>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data.map((dt) => {
          return {
            ...dt,
            user: dt.user.name,
            date: `${formattedDate(dt.dateStart)} - ${formattedDate(
              dt.dateEnd
            )}`,
          };
        })}
        columns={hotelColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default TransList;
