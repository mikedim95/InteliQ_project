import React, { useState, useEffect } from "react";
import { Form, Col, FormControl } from "react-bootstrap";
import Row from "react-bootstrap/row";
import Container from "react-bootstrap/container";
import Button from "react-bootstrap/Button";

const ChildDropdown = (props) => {
  const [questions, setQuestions] = useState(props);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("my props are: ", props);
    };

    fetchData();
  }, []);
  function handleChange(e) {
    setSelectedValue(e.target.value);

    /*  props.updateAnswers(selectedValue); */
  }

  function submit(e) {
    props.updateAnswers(
      props.question.qID,
      props.answers[0].nextqID,
      selectedValue
    );
    console.log("submiting: " + props.answers[0].nextqID);
    /*  props.updateAnswers(selectedValue); */
  }
  /* props.updateAnswers("arg"); */
  console.log("now selected value is: " + selectedValue);
  return (
    <div>
      <Container>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row className="mt-5">
                <Col md>
                  <Form.Label>{props.question.qtext}</Form.Label>
                  <FormControl
                    type="text"
                    onChange={handleChange}
                  ></FormControl>
                </Col>

                <Col md>
                  <Button
                    onClick={submit}
                    /*  type="submit" */
                    variant="success"
                    style={{ float: "left" }}
                  >
                    Continue
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            ></Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default ChildDropdown;
