import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "../general/MyNavbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import heartbeatOk from "../../resources/img/heartbeatOk.png";
import sessionDatabaseJpg from "../../resources/img/sessionDatabase.jpg";
import questionDatabaseJpg from "../../resources/img/questionDatabase.jpg";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import Form from "react-bootstrap/Form";

/* debugger; */
export default function AdminPage() {
  const [questionnaireID, setQuestionnaireID] = useState("QQ000"); // Static questionnair value
  const [sessionComponentRender, setSessionComponentRender] = useState(false); // Bool for session render
  const [questionComponentRender, setQuestionComponentRender] = useState(false); // Bool for question render
  const [sessionValue, setSessionValue] = useState(); //Session value to search results from
  const [sessionAnswers, setSessionAnswers] = useState(); //The results from the session search
  const [questionIdValue, setQuestionIdValue] = useState(); //QuestionId value to search results from
  const [questionIdAnswers, setQuestionIdAnswers] = useState(); //The results from the qiestionId search
  console.log(
    "with this render the sessionComponentRender is: " + sessionComponentRender
  );
  console.log(sessionAnswers);
  useEffect(() => {
    /* 
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get("http://localhost:3000/questionnaire/QQ000"),
          axios.get("http://localhost:3000/question/QQ000/P00"),
        ]);
        console.log(response1.data);
        setQuestionnair(response1.data);
        console.log(response2.data);
        setQuestion(response2.data);

        setBegin(true);
      } catch (error) {
        console.log(error);
      }
    };

    console.log("useeffect");
    fetchData(); */
  }, []);
  function perSessionInputChange(e) {
    setSessionValue(e.target.value);
  }
  function closeSessionData() {
    setSessionComponentRender(false);
  }
  function handlePerSessionButton(e) {
    e.preventDefault();
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9103/getsessionanswers/" +
            questionnaireID +
            "/" +
            sessionValue
        );
        console.log(response.data);
        setSessionAnswers(response.data);
        setSessionComponentRender(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData1();
  }

  function perQuestionInputChange(e) {
    setQuestionIdValue(e.target.value);
  }
  function closeQuestionData() {
    setQuestionComponentRender(false);
  }
  function handlePerQuestionButton(e) {
    e.preventDefault();
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9103/getquestionanswers/" +
            questionnaireID +
            "/" +
            questionIdValue
        );
        console.log(response.data);
        setQuestionIdAnswers(response.data);
        setQuestionComponentRender(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData2();
  }

  /*  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get("http://localhost:3000/questionnaire/QQ000"),
          axios.get("http://localhost:3000/question/QQ000/P00"),
        ]);
        console.log(response1.data);
        setQuestionnair(response1.data);
        console.log(response2.data);
        setQuestion(response2.data);
        setReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); */
  return (
    <>
      <MyNavbar />

      <div
        className="Admin-body1"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ color: "white" }}>Search by Session or by Question</h1>
        <div style={{ display: "flex" }}>
          <Card style={{ width: "18rem", height: "32rem", margin: " 5px" }}>
            <Card.Header>Per Session</Card.Header>
            <Card.Img variant="top" src={sessionDatabaseJpg} />
            <Card.Body style={{ display: "flex" }}>
              <Form
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handlePerSessionButton}
                >
                  Check!
                </Button>

                <Form.Control
                  onChange={perSessionInputChange}
                  placeholder="Enter session"
                />
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", height: "32rem", margin: " 5px" }}>
            <Card.Header>Per Question</Card.Header>
            <Card.Img variant="top" src={questionDatabaseJpg} />

            <Card.Body style={{ display: "flex" }}>
              <Form
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handlePerQuestionButton}
                >
                  Check!
                </Button>

                <Form.Control
                  onChange={perQuestionInputChange}
                  placeholder="Enter question"
                />
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div
        className="Admin-body2"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {sessionComponentRender && (
          <ComponentA data={sessionAnswers} function={closeSessionData} />
        )}

        {questionComponentRender && (
          <ComponentB data={questionIdAnswers} function={closeQuestionData} />
        )}
      </div>
    </>
  );
}
