import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <Route exact path="/" component={() => <HomePage />} />
    </div>
  </BrowserRouter>
);

export default App;
