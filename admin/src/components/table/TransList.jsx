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

    return `${year}/${month}/${day}`;
  };

  const today = formattedDate(new Date());

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
            date: `${dt.dateStart} - ${dt.dateEnd}`,
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

// import "./dashBoard.scss";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import useFetch from "../../hooks/useFetch";

// const TransList = () => {
//   const { data } = useFetch(`http://localhost:5000/api/trans`);

//   const formattedDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");

//     return `${year}/${month}/${day}`;
//   };

//   const today = formattedDate(new Date());

//   return (
//     <TableContainer component={Paper} className="table">
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <input type="checkbox" />
//             </TableCell>
//             <TableCell className="tableCell">ID</TableCell>
//             <TableCell className="tableCell">User</TableCell>
//             <TableCell className="tableCell">Hotel</TableCell>
//             <TableCell className="tableCell">Room</TableCell>
//             <TableCell className="tableCell">Date</TableCell>
//             <TableCell className="tableCell">Price</TableCell>
//             <TableCell className="tableCell">Payment Method</TableCell>
//             <TableCell className="tableCell">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((trans) => (
//             <TableRow key={trans._id}>
//               <TableCell>
//                 <input type="checkbox" />
//               </TableCell>
//               <TableCell className="tableCell">{trans._id}</TableCell>
//               <TableCell className="tableCell">{trans.user.name}</TableCell>
//               <TableCell className="tableCell">{trans.hotel}</TableCell>
//               <TableCell className="tableCell">{String(trans.room)}</TableCell>
//               <TableCell className="tableCell">
//                 {trans.dateStart} - {trans.dateEnd}
//               </TableCell>
//               <TableCell className="tableCell">${trans.price}</TableCell>
//               <TableCell className="tableCell">{trans.payment}</TableCell>
//               <TableCell className="tableCell">
//                 <span
//                   className={`status ${
//                     today >= trans.dateStart && today <= trans.dateEnd
//                       ? "CHECKIN"
//                       : ""
//                   }
//                   ${today < trans.dateStart ? "BOOKED" : ""}
//                   ${today > trans.dateEnd ? "CHECKOUT" : ""}`}
//                 >
//                   {today >= trans.dateStart && today <= trans.dateEnd
//                     ? "CHECKIN"
//                     : ""}
//                   {today < trans.dateStart ? "BOOKED" : ""}
//                   {today > trans.dateEnd ? "CHECKOUT" : ""}
//                 </span>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TransList;
