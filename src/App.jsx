import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

import {
  MockupsPage,
  MakeBoxMockupPage,
  FindBoxMockupPage
} from "modules/mockups/pages";
import {
  SignInPage,
  SignOutPage,
  ResetPasswordPage,
  PasswordChangePage
} from "modules/auth/pages";

import {
  InvitePage,
  CreateOrganizationPage,
  JoinPage
} from "./modules/signup/pages";
import {
  ProductsPage,
  AddProductPage,
  EditProductPage
} from "./modules/products/pages";
import { BoxesPage, CreateLabelsPage } from "./modules/boxes/pages";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { GoogleAnalytics } from "./modules/layout/components";
import { NotFoundPage, DashboardPage } from "./modules/layout/pages";
import theme from "./theme";
import { PrivateRoute } from "./modules/auth/components";
import { registerAuthStateObserver } from "./modules/auth/actions";

addLocaleData([...en]);

const App = ({ registerAuthStateObserver }) => {
  useEffect(() => {
    registerAuthStateObserver();
  }, [registerAuthStateObserver]);
  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <PrivateRoute exact path="/" component={DashboardPage} />
              <PrivateRoute exact path="/boxes" component={BoxesPage} />
              <PrivateRoute
                exact
                path="/create-labels"
                component={CreateLabelsPage}
              />
              <PrivateRoute exact path="/products" component={ProductsPage} />
              <PrivateRoute
                exact
                path="/products/add"
                component={AddProductPage}
              />
              <PrivateRoute
                exact
                path="/products/edit/:productId"
                component={EditProductPage}
              />
              <PrivateRoute exact path="/invite" component={InvitePage} />
              <PrivateRoute exact path="/signout" component={SignOutPage} />
              <PrivateRoute
                exact
                path="/password"
                component={PasswordChangePage}
              />
              <PrivateRoute exact path="/mockups" component={MockupsPage} />
              <PrivateRoute
                exact
                path="/mockups/make-box"
                component={MakeBoxMockupPage}
              />
              <PrivateRoute
                exact
                path="/mockups/find-box"
                component={FindBoxMockupPage}
              />
              <Route
                exact
                path="/create-organization"
                component={CreateOrganizationPage}
              />
              <Route
                exact
                path="/reset-password"
                component={ResetPasswordPage}
              />
              <Route exact path="/join/:inviteId" component={JoinPage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route component={NotFoundPage} />
            </Switch>
            {/* this is outside the switch so the 404 works */}
            <Route path="/" component={GoogleAnalytics} />
          </ScrollToTop>
        </BrowserRouter>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

export default connect(
  null,
  { registerAuthStateObserver }
)(App);
