import React from "react";
import { Route, HashRouter } from "react-router-dom";
import { ModifyOpProvider } from "./context/ModifyOpContext";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NewData from "./components/NewData";
import Register from "./components/Register";
import LogIn from "./components/Login";
import Categories from "./components/Categories";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  font-family: "Quicksand", sans-serif;
`;

const Title = styled.h3`
  font-weight: 300;
`;

function App() {
  return (
    <HashRouter basename="/">
      <Wrapper className="container">
        <div className="container mt-5 mb-2 d-flex justify-content-center">
          <Title className="text-right mr-3 mt-2">
            BUDG
            <br />
            APP
          </Title>
          <img
            src="https://icongr.am/clarity/wallet.svg?size=120&color=ff42a7"
            alt="Logo app"
          />
        </div>
        <NavBar />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/newdata" component={NewData} />
        <Route exact path="/categories" component={Categories} />
        <ModifyOpProvider>
          <Route exact path="/" component={Home} />
        </ModifyOpProvider>
      </Wrapper>
    </HashRouter>
  );
}

export default App;
