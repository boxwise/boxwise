import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={() => <HomePage />} />
    </div>
  </BrowserRouter>
);

export default App;
