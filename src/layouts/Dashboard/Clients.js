import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, email, address) {
  return { id, date, name, email, address };
}

const rows = [
  createData(
    0,
    "16 Mar, 2022",
    "Elvis Presley",
    "elvis@soyhenry.com",
    "21 St. Georgtown Av 344"
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "paulmccartney@soyhenry.com",
    "Castle Almonds 324 - CA"
  ),
  createData(
    2,
    "16 May, 2021",
    "Tom Cruise",
    "tom@soyhenry.com",
    "Wallaby St 42 Sydney"
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "michael@soyhenry.com",
    "GT 45 - 123 AV"
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "bruce@soyhenry.com",
    "323 Park AV 345"
  ),
];

export default function Clients() {
  return (
    <React.Fragment>
      <Title>Clients</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
