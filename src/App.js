import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthedRoute from "./router/AuthedRoute";
import DashboardPage from "./pages/DashboardPage";
import BoxesPage from "./pages/BoxesPage";
import CreateLabelsPage from "./pages/CreateLabelsPage";
import ProductsPage from "./pages/ProductsPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import SignInPage from "./pages/SignInPage";
import InvitePage from "./pages/InvitePage";
import JoinPage from "./pages/JoinPage";
import MockupsPage from "./pages/MockupsPage";
import MakeBoxMockupPage from "./pages/MakeBoxMockupPage";
import FindBoxMockupPage from "./pages/FindBoxMockupPage";
import NotFound from "./components/NotFound";

import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Switch>
          <AuthedRoute exact path="/" component={() => <DashboardPage />} />
          <AuthedRoute exact path="/boxes" component={() => <BoxesPage />} />
          <AuthedRoute
            exact
            path="/create-labels"
            component={() => <CreateLabelsPage />}
          />
          <AuthedRoute
            exact
            path="/products"
            component={() => <ProductsPage />}
          />
          <AuthedRoute exact path="/invite" component={() => <InvitePage />} />
          <Route
            exact
            path="/create-organization"
            component={() => <CreateOrganizationPage />}
          />
          <Route exact path="/signin" component={() => <SignInPage />} />
          <Route exact path="/join/:inviteId" component={() => <JoinPage />} />

          <Route exact path="/mockups" component={() => <MockupsPage />} />
          <Route
            exact
            path="/mockups/make-box"
            component={() => <MakeBoxMockupPage />}
          />
          <Route
            exact
            path="/mockups/find-box"
            component={() => <FindBoxMockupPage />}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
