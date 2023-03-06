import MyNavbar from "./components/general/MyNavbar";

import Dropdown from "react-bootstrap/Dropdown";
function App() {
  return (
    <div className="App">
      <MyNavbar />
      <header className="App-body">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Please, select one of the following...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/intelliq_api/FillingPage">
              Participate in Questionnaire
            </Dropdown.Item>
            <Dropdown.Item href="/intelliq_api/AdminPage">
              Extract statistics (requires identification)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
    </div>
  );
}

export default App;
