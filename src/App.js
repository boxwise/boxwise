import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AuthedRoute from "./router/AuthedRoute";
import DashboardPage from "./pages/DashboardPage";
import BoxesPage from "./pages/BoxesPage";
import CreateLabelsPage from "./pages/CreateLabelsPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import InvitePage from "./pages/InvitePage";
import MakeBoxUIPage from "./pages/MakeBoxUIPage";
import JoinPage from "./pages/JoinPage";

import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

const App = () => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      <AuthedRoute exact path="/" component={() => <DashboardPage />} />
      <AuthedRoute exact path="/boxes" component={() => <BoxesPage />} />
      <AuthedRoute
        exact
        path="/create-labels"
        component={() => <CreateLabelsPage />}
      />
      <AuthedRoute exact path="/products" component={() => <ProductsPage />} />
      <AuthedRoute exact path="/invite" component={() => <InvitePage />} />
      <Route exact path="/signup" component={() => <SignUpPage />} />
      <Route exact path="/signin" component={() => <SignInPage />} />
      <Route exact path="/join/:inviteId" component={() => <JoinPage />} />
      <Route exact path="/makebox-ui" component={() => <MakeBoxUIPage />} />
    </div>
  </BrowserRouter>
);

export default App;
