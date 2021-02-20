import NewData from "./NewData";
import { Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import styled from "styled-components/macro";
import Register from "./Register";
import LogIn from "./Login";
import React from "react";
import Categories from "./Categories";

const Wrapper = styled.div`
  font-family: "Quicksand", sans-serif;
`;

const Title = styled.h3`
  font-weight: 300;
`;

function App() {
  return (
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
      <Route exact path="/" component={Home} />
    </Wrapper>
  );
}

export default App;
