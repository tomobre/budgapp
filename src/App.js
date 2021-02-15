import "./App.css";
import NewData from "./NewData";
import { Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="container">
      <div className="container">
        <h2>Prespuesto app</h2>
        <img
          className="center"
          src="https://icongr.am/clarity/wallet.svg?size=100&color=ff42a7"
          alt=""
        />
      </div>

      <NavBar />
      <Route exact path="/newdata" component={NewData} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
