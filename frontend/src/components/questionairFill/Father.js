import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MyNavbar from "../general/MyNavbar";
import ChildDropdown from "./ChildDropdown";
import ChildControl from "./ChildControl";
import Test from "./Test";

import Goodbye from "./Goodbye";

function Father() {
  // ------------------------- vV The States Vv ------------------------- //

  const [questionnaire, setQuestionnair] = useState(); // Έχει όλο το ερωτηματολόγιο
  const [question, setQuestion] = useState(); // Έχει μόνο την τη μία ερώτηση
  const [currentQuestionId, setCurrentQuestionId] = useState("P00"); // Κρατάει το state σε ποια ερώτηση βρισκόμαστε
  const [ready, setReady] = useState(false);
  const [begin, setBegin] = useState(false); //false to show spinner, true to show 1st question
  const [finish, setFinish] = useState(false); //false to show questions, true to goodbye

  const [answers, setAnswers] = useState();
  const [sessionID] = useState(Math.random().toString(36).substring(2, 6)); // Κρατάει τις απαντήσεις μέχρι τώρα

  function updateAnswers(thisQuestion, nextQuestion, optionID) {
    console.log("This is question: " + thisQuestion);
    console.log("for next question i got.. " + nextQuestion);
    console.log("with optionID: " + optionID);
    console.log();
    setCurrentQuestionId(nextQuestion);
    const fetchData = async () => {
      try {
        const postAnswer = async () => {
          const data = await axios.post(
            "http://localhost:9103/doanswer/" +
              questionnaire.questionnaireID +
              "/" +
              thisQuestion +
              "/" +
              sessionID +
              "/" +
              optionID
          );
        };
        postAnswer();

        if (nextQuestion != "-") {
          try {
            const getNewQuestion = async () => {
              const response = await axios.get(
                "http://localhost:9103/question/QQ000/" + nextQuestion
              );
              console.log("The next question is: ", response.data);
              setQuestion(response.data);
              setReady(true);
            };
            getNewQuestion();
          } catch (error) {
            console.log(error);
          }
        } else {
          setFinish(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }
  // ------------------------- vV Get Questionnair Vv ------------------------- //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get("http://localhost:9103/questionnaire/QQ000"),
          axios.get("http://localhost:9103/question/QQ000/P00"),
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
    fetchData();
  }, []);
  console.log("passing question: " + question);
  // ------------------------- vV Rendering Vv ------------------------- //
  /* console.log("the question is! ");
  console.log(question);
  console.log("the questionnair is! ");
  console.log(questionnaire); */
  return (
    <div className="FillingPage">
      <MyNavbar />
      <div className="FillingPage-body">
        {begin ? (
          !finish ? (
            question.options.length === 1 ? (
              <ChildControl
                question={
                  questionnaire.questions.filter(
                    (item) => item.qID === currentQuestionId
                  )[0]
                }
                answers={question.options}
                updateAnswers={updateAnswers}
              />
            ) : (
              <ChildDropdown
                question={
                  questionnaire.questions.filter(
                    (item) => item.qID === currentQuestionId
                  )[0]
                }
                answers={question.options}
                updateAnswers={updateAnswers}
              />
            )
          ) : (
            <Goodbye />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Father;
