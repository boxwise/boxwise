import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

import Config from "./Config";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardPage from "./pages/DashboardPage";
import BoxesPage from "./pages/BoxesPage";
import HomePage from "./pages/HomePage";
import CreateLabelsPage from "./pages/CreateLabelsPage";
import ProductsPage from "./pages/ProductsPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import {
  SignInPage,
  ResetPasswordPage,
  PasswordChangePage
} from "./modules/auth";
import InvitePage from "./pages/InvitePage";
import JoinPage from "./pages/JoinPage";
import MockupsPage from "./pages/MockupsPage";
import MakeBoxMockupPage from "./pages/MakeBoxMockupPage";
import FindBoxMockupPage from "./pages/FindBoxMockupPage";
import NotFound from "./components/NotFound";
import theme from "./theme";
import withAuthentication from "./commons/HOCs/withAuthentication";

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
  <ErrorBoundary>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path="/"
              component={withAuthentication(DashboardPage, HomePage)}
            />
            <Route
              exact
              path="/boxes"
              component={withAuthentication(BoxesPage)}
            />
            <Route
              exact
              path="/create-labels"
              component={withAuthentication(CreateLabelsPage)}
            />
            <Route
              exact
              path="/products"
              component={withAuthentication(ProductsPage)}
            />
            <Route
              exact
              path="/invite"
              component={withAuthentication(InvitePage)}
            />
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
            <Route
              exact
              path="/password"
              component={withAuthentication(PasswordChangePage)}
            />
            <Route
              exact
              path="/join/:inviteId"
              component={() => <JoinPage />}
            />
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
  </ErrorBoundary>
);

export default App;
