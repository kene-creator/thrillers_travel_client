import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw from "twin.macro";
import "./App.css";
import styled from "styled-components";
import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/Login_Registration/Login";
import RegistrationPage from "./containers/Login_Registration/Registration";
import { useSelector } from "react-redux";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

function App() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          {auth.accessToken ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/login" element={<LoginPage />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
