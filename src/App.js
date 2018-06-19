import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import Config from "./Config";
import ScrollToTop from "./components/ScrollToTop";

import AuthedRoute from "./router/AuthedRoute";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import BoxesPage from "./pages/BoxesPage";
import CreateLabelsPage from "./pages/CreateLabelsPage";
import ProductsPage from "./pages/ProductsPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import SignInPage from "./containers/pages/SignInPage";
import ResetPasswordPage from "./containers/pages/ResetPasswordPage";
import PasswordChangePage from "./pages/PasswordChangePage";
import InvitePage from "./pages/InvitePage";
import JoinPage from "./pages/JoinPage";
import MockupsPage from "./pages/MockupsPage";
import MakeBoxMockupPage from "./pages/MakeBoxMockupPage";
import FindBoxMockupPage from "./pages/FindBoxMockupPage";
import NotFound from "./components/NotFound";

import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

addLocaleData([...en]);

if (Config.GOOGLE_ANALYTICS_CODE) {
  ReactGA.initialize(Config.GOOGLE_ANALYTICS_CODE);
}

const recordPageview = ({ location }) => {
  if (Config.GOOGLE_ANALYTICS_CODE) {
    ReactGA.pageview(location.pathname);
  }
  return null;
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/home" component={() => <HomePage />} />
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
          <Route
            exact
            path="/reset-password"
            component={() => <ResetPasswordPage />}
          />
          <AuthedRoute
            exact
            path="/password"
            component={() => <PasswordChangePage />}
          />
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
        {/* this is outside the switch so the 404 works */}
        <Route path="/" render={recordPageview} />
      </ScrollToTop>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
