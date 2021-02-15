import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tables from "./Components/Table/TransferTable";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Create from "./Pages/Create/Create";
import HistoryTable from "./Components/Table/HistoryTable";
import { useStateValue } from "../src/Context/StateProvider";
function App() {
  const [state] = useStateValue();
  return (
    <div className={`app ${state.theme && "dark"}`}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Landing />} />
          <Route exact path="/create" component={() => <Create />} />
          <Route exact path="/transfer" component={() => <Tables />} />
          <Route exact path="/history" component={() => <HistoryTable />} />
          <Route path="*" exact component={<h1>Error</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
