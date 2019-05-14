import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "react-testing-library";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export { fireEvent } from "react-testing-library";

// following suggestions in https://testing-library.com/docs/react-testing-library/setup#custom-render

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

export function customRender(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = {},
    reducer = state => state,
    store = createStore(reducer, initialState)
  } = {}
) {
  return render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export { customRender as render };
