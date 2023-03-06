# <span style="color: RoyalBlue;">Api - Backend</span>

## Technology Stack
* Database: MongoDB
* Server runtime environment: NodeJS
* Web Application Framework: Express

## Database

The intelliQ database is a cloud hosted MongoDB in Atlas.

The database has two collections.
* questionnaires: Is the collection which we store the questionnaires and all their information.
* answers: Is the collection which we store all the answers given by the users.

The schemas of these collections can be found on /SoftEng22-50/api-backend/models   .

## Instructions to run the Server
* First install NodeJS  .
* Change your directory to SoftEng22-50/api-backend .
* If it is the first time running the server type in the terminal $ npm install .
* In the terminal type $ npm run start   .

The app is now running and can be accesed from http://localhost:9103.


## Endpoints

* <span style="color: CornflowerBlue;">"/questionnaire/:questionnaireID"</span>:    Get request that sends some information about the requested questionnaire.
* <span style="color: CornflowerBlue;">"/question/:questionnaireID/:questionID"</span>: Get request that sends some information about the requested question.
* <span style="color: CornflowerBlue;">"/doanswer/:questionnaireID/:questionID/:session/:optionID"</span>: Post request that submits an answer to the answers collection of the intelliQ database.
*  <span style="color: CornflowerBlue;">"/getsessionanswers/:questionnaireID/:session"</span>:   Get request that returns all the answers submitted by the requested session.
* <span style="color: CornflowerBlue;">"/getquestionanswers/:questionnaireID/:questionID"</span>:   Get request that returns the all the answers given to the requested question and their respective sessions.
* <span style="color: CornflowerBlue;">"/admin/healthcheck"</span>: Get request that gives us information about the connection of our server with tha Atlas Database.
* <span style="color: CornflowerBlue;">"/admin/questionnaire_upd"</span>: Post request that stores the given questionnaire in the questionnaires collection of the intelliQ database.
* <span style="color: CornflowerBlue;">"/admin/resetq/:questionnaireID"</span>: Post request that deletes all anwsers assosiated with the requested questionnaire from the answers collection of the intelliQ database.
* <span style="color: CornflowerBlue;">"/admin/resetall"</span>: Post request that deletes all documents from the questionnaires and answers collection of the intelliQ database.

