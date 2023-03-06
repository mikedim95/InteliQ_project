/** To start our server with nodemon >npm run devstart
 *                           node    >npm run start 
 */


const express = require("express"); //backend web framework
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");
const _ = require('lodash')
const createError = require('http-errors');

//connect to db
mongoose.set("strictQuery", true);
const connectDB = require("./dbConnection");
connectDB();

// init app
const app = express();
app.listen("9103", () => {
  console.log("app listening on port 9103");
});


//middleware
app.use(bodyParser.json());


//Schemas
const questionnaires = require("./models/questionnaire");
const answers = require("./models/answer");
const { db } = require("./models/answer");

//Routes
app.get("/devtest", async (req, res) => {
  res.status(200).json({
    message: 'is working all good'
  })
})

app.get("/admin/healthcheck", async (req, res) => {
  try {
      connectDB();
      res.status(200).json({
        status: 'OK'
      })
  } catch (error) {
    res.status(500).json({status: `failed`})
    return(null);
  }
})

/** de peirazoume to parakatw */
app.post("/admin/questionnaire_upd",
  asyncHandler(async (req, res) => {
    const apantisi = await questionnaires.create({
      questionnaireID: req.body.questionnaireID,
      questionnaireTitle: req.body.questionnaireTitle,
      keywords: req.body.keywords,
      questions: req.body.questions,
    });
    res.status(200).json({message: `questionnaire with id ${req.body.questionnaireID} upoaded succesfully`});
  })
);

/** den aggizoume to paraktw */
app.get("/questionnaire/:questionnaireID",
  asyncHandler(async (req, res) => {
    const questionnaire = await questionnaires.findOne({
      questionnaireID: req.params.questionnaireID,
    });

    if (questionnaire==null) {
      res.status(402).json({error_message: `the questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null);
    }

    const mapped = questionnaire.questions.map(
      ({ qID, qtext, required, istype }) => ({ qID, qtext, required, istype })
    );

    const apantisi = {
      questionnaireID: questionnaire.questionnaireID,
      questionnaireTitle: questionnaire.questionnaireTitle,
      keywords: questionnaire.keywords,
      questions: mapped
    }
    res.status(200).json(apantisi);
  })
);

/** den aggizoume to parakatw */
app.get("/question/:questionnaireID/:questionID",
  asyncHandler(async (req, res) => {
    const questionnaire = await questionnaires.findOne({
      questionnaireID: req.params.questionnaireID,
    });

    if (questionnaire==null) {
      res.status(402).json({error_message:`the questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null)
    }
    
    apantisi=null

    for (var j = 0; j < questionnaire.questions.length; j++) {
      if (req.params.questionID == questionnaire.questions[j].qID) {
        apantisi = {
          questionnaireID: questionnaire.questionnaireID,
          qID: questionnaire.questions[j].qID,
          qtext: questionnaire.questions[j].qtext,
          required: questionnaire.questions[j].required,
          istype: questionnaire.questions[j].istype,
          options: questionnaire.questions[j].options
        };
        break;
      }
    }

    if (apantisi==null) {
      res.status(402).json({error_message:`the question with id ${req.params.questionID} is not valid`})
      return(null)
    }

    res.status(200).json(apantisi);
    

  })
);


/** den aggizoume to parakatv */ 
app.post("/doanswer/:questionnaireID/:questionID/:session/:optionID",
  asyncHandler(async (req, res) => {
    
    const questionnaire = await questionnaires.findOne({
      questionnaireID: req.params.questionnaireID,
    });
    if (questionnaire==null) {
      res.status(402).json({error_message:`the questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null);
    }
    
    apantisi=null

    for (var j = 0; j < questionnaire.questions.length; j++) {
      if (req.params.questionID == questionnaire.questions[j].qID) {
        apantisi = {
          questionnaireID: questionnaire.questionnaireID,
        };
        break;
      }
    }

    if (apantisi==null) {
      res.status(402).json({error_message:`the question with id ${req.params.questionID} is not valid`})
      return(null);
    }



    const fresh = await answers.create({
      questionnaireID: req.params.questionnaireID,
      qID: req.params.questionID,
      ans: req.params.optionID,
      session: req.params.session,
    });    
    res.status(200).json({message: "anwser submited to database succesfully"});
  
  })
);

/** den aggizoume to parakatw */
app.get("/getsessionanswers/:questionnaireID/:session",
  asyncHandler(async (req, res) => {

    const questionnaire = await questionnaires.findOne({
      questionnaireID: req.params.questionnaireID,
    });
    if (questionnaire==null) {
      res.status(402).json({error_message:`the questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null)
    }
    
    const lista = await answers.find({questionnaireID: req.params.questionnaireID, session: req.params.session})

    if (_.isEmpty(lista)) {
      res.status(402).json({error_message: `the session with id ${req.params.session} is not valid`})
      return(null);
    }


    let selectedFields = lista.map(obj => {
      return {qID: obj.qID, ans: obj.ans};
    });

    
    selectedFields.sort(function(a, b) {
      return a.qID.localeCompare(b.qID);
    });


    const apantisi = {
        questionnaireID: req.params.questionnaireID,
        session: req.params.session,
        anwsers: selectedFields
    };

    res.status(200).json(apantisi);

  })
);

/*den aggizoume to parakatw*/
app.get("/getquestionanswers/:questionnaireID/:questionID",
  asyncHandler(async (req, res) => {
    const questionnaire = await questionnaires.findOne({
      questionnaireID: req.params.questionnaireID,
    });
    if (questionnaire==null) {
      res.status(402).json({error_message:`the questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null);
    }

    jeff=null

    for (var j = 0; j < questionnaire.questions.length; j++) {
      if (req.params.questionID == questionnaire.questions[j].qID) {
        jeff = {
          questionnaireID: questionnaire.questionnaireID
        };
        break;
      }
    }

    if (jeff==null) {
      res.status(402).json({error_message:`the question with id ${req.params.questionID} is not valid`})
      return(null);
    }

    lista = await answers.find({questionnaireID: req.params.questionnaireID, qID: req.params.questionID})


    let selectedFields = lista.map(obj => {
      return {session: obj.session, ans: obj.ans};
    });

    const apantisi = {
      questionnaireID: req.params.questionnaireID,
      qID: req.params.questionID,
      anwsers: selectedFields
    };

    res.status(200).json(apantisi);
  })
);

app.get(
  "/sessioncheck/:session",
  asyncHandler(async (req, res) => {
    lista = await answers.find({session: req.params.session})

    if (_.isEmpty(lista)){
      apantisi= false
    }
    else{
      apantisi = true
    }

    res.status(200).json(apantisi);
  })
);

/**den aggizoume to parakatw */
app.post("/admin/resetq/:questionnaireID",
  asyncHandler(async (req, res) => {

    const chex = await questionnaires.findOne({questionnaireID: req.params.questionnaireID})

    if(chex == null){
      res.status(404).json({message: `questionnaire with id ${req.params.questionnaireID} is not valid`})
      return(null)
    }

    const lista = await answers.find({questionnaireID: req.params.questionnaireID})

    if (_.isEmpty(lista)){
      res.status(200).json({message: `questionnaire with id ${req.params.questionnaireID} has no answers in database`})
      return(null);
    }
    
    for (var j = 0; j < lista.length; j++) {
      await lista[j].remove()
    }

    res.status(200).json({status: `OK`});
  })
);

//**den aggizoume to parakatw */
app.post("/admin/resetall",
  asyncHandler(async (req, res) => {
    console.log("my name is")
    await questionnaires.deleteMany()
    await answers.deleteMany()

    res.status(200).json({status: `OK`});
  })
);



app.use((req, res, next) => {
  next(createError(400, "Bad Request"))
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



