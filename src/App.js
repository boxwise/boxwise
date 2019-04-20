import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

import {
  MockupsPage,
  MakeBoxMockupPage,
  FindBoxMockupPage
} from "modules/mockups";
import {
  SignInPage,
  ResetPasswordPage,
  PasswordChangePage
} from "modules/auth";

import {
  InvitePage,
  CreateOrganizationPage,
  JoinPage,
  HomePage
} from "./modules/signup";
import { ProductsPage } from "./modules/products";
import { BoxesPage, CreateLabelsPage } from "./modules/boxes";
import Config from "./Config";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotFoundPage, DashboardPage } from "./modules/layout";
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
            <Route component={NotFoundPage} />
          </Switch>
          {/* this is outside the switch so the 404 works */}
          <Route path="/" render={recordPageview} />
        </ScrollToTop>
      </BrowserRouter>
    </MuiThemeProvider>
  </ErrorBoundary>
);

export default App;
