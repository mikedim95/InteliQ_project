import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Button from "react-bootstrap/Button";
/* debugger; */

export default function ComponentB(props) {
  console.log(props.data.anwsers);
  function finish() {
    props.function();
  }

  return (
    <div style={{ minWidth: "400px" }}>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Session</TableCell>
              <TableCell align="right">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.anwsers.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.session}
                </TableCell>
                <TableCell align="right">{item.ans}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* <Table bordered hover>
        <thead style={{ color: "#ffffff" }}>
          <tr>
            <th>id</th>
            <th>qID</th>
            <th>optID</th>
          </tr>
        </thead>
        <tbody>
          {props.data.anwsers.map((item, index) => console.log(item))}
        </tbody>
      </Table> */}
      <Button onClick={finish}>close</Button>
    </div>
  );
}
