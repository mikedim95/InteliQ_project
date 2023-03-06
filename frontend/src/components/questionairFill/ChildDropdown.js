import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/container";
import Row from "react-bootstrap/row";
import { Form, Col } from "react-bootstrap";
/* debugger; */
export default function Test(props) {
  const [myChoice, setMyChoice] = useState(props.answers[0]); // hook that is used in MenuItem Select
  const [nextQID, setNextQID] = useState(); // hook that holds the nextqID attribute of selected object
  const [selectedAnswer, setSelectedAnswer] = useState(); // hook that holds th optID of selected onject

  useEffect(() => {
    console.log("my props are: ", props);
  }, [props]);
  const handleChange = (e) => {
    console.log(e.target);
    setMyChoice(e.target.value);
    setNextQID(e.target.value.nextqID);
    setSelectedAnswer(e.target.value.optID);
  };
  function submit(e) {
    e.preventDefault();
    props.updateAnswers(props.question.qID, nextQID, selectedAnswer);
  }
  console.log(
    "this render had the hooks: " +
      "\nnextQID: " +
      nextQID +
      "\nselectedAnswer: " +
      selectedAnswer
  );
  if (props.question.qtext == undefined) {
    debugger;
  }
  return (
    <Container style={{ paddingTop: "200" }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Form.Label>{props.question.qtext}</Form.Label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={myChoice}
            label="Age"
            onChange={handleChange}
            style={{ backgroundColor: "white" }}
          >
            {props.answers.map((item, index) => (
              <MenuItem key={index} value={item}>
                {JSON.stringify(item.opttxt).replace(/['"]+/g, "")}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={submit}
            /*  type="submit" */
            variant="success"
            style={{ marginTop: 10, maxWidth: 100, float: "right" }}
          >
            Continue
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}
