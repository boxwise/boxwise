import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AuthedRoute from "./router/AuthedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

const App = () => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      {/* FIXME: AuthedRoute only seems to work on first load for some reason
      <AuthedRoute exact path="/" component={() => <DashboardPage />} />
      <AuthedRoute exact path="/products" component={() => <ProductsPage />} />
      */}
      <Route exact path="/" component={() => <DashboardPage />} />
      <Route exact path="/products" component={() => <ProductsPage />} />
      <Route exact path="/signup" component={() => <SignUpPage />} />
      <Route exact path="/signin" component={() => <SignInPage />} />
    </div>
  </BrowserRouter>
);

export default App;
