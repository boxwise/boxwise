import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

const App = () => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      <Navigation />
      <Route exact path="/" component={() => <HomePage />} />
      <Route exact path="/signup" component={() => <SignUpPage />} />
      <Route exact path="/signin" component={() => <SignInPage />} />
    </div>
  </BrowserRouter>
);

export default App;
