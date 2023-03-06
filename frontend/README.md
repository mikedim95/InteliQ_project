# Front-end
 
 This will be the graphical interface which will call the back end endpoint APIs on behalf of the user. By entering you have to choose between taking the survey, or see the accumulated answers. The navbar here is experimental. For now serves the same features as the initial prompt, but it can be scaled to host many more features.

## Packages/modules:

All the used modules are listed in the frontend/package.JSON
  
## Installation:
Install the CORS extension on google chrome https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf and then enable it

from terminal:
- cd frontend
- npm install
- npm start

## composition:
- Everthing starts at Index.js. There is located the routing of the whole project.
- The 1st page to be renderd is app.js (this is the landing page)
- By taking the survey, you are routed the father component. There the 1st question of the hardcoded questionnair is fetched.Then the father renders either of the 2 children (text answer or dropdown answer). After submiting an answer, the next question (which is determined from the previous answer) is loaded from father , passed as props to the corresponding child and renderd, ready to be answered. This continues until the next question value is a '-'
- After completing at least 1 questionnair, you can navigate to 'Extract statistics'
- These are all based on the QQ000 questionair (hardcoded). From there you can search the answers given. Once the search term is right, the answers will be displayed at the bottom of the page.
