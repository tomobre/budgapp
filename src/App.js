import "./App.css";
import NewData from "./NewData";
import { Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path="/newdata" component={NewData} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
