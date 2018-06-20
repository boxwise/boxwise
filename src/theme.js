import { createMuiTheme } from "@material-ui/core/styles";

const fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        border: 0,
        minWidth: 100,
        marginRight: 5
      }
    }
  },
  typography: {
    fontFamily: fontFamily,
    headline: {
      fontFamily: fontFamily,
      fontWeight: 700
    },
    button: {
      fontFamily: fontFamily,
      fontWeight: 700
    },
    title: {
      fontFamily: fontFamily
    },
    subheading: {
      fontFamily: fontFamily
    }
  },
  palette: {
    primary: {
      light: "#60ccff",
      main: "#009bd9",
      dark: "#006da7",
      contrastText: "#fff"
    },
    secondary: {
      light: "#60ccff",
      main: "#009bd9",
      dark: "#006da7",
      contrastText: "#fff"
    }
  }
});

export const drawerTheme = createMuiTheme({
  typography: {
    fontFamily: fontFamily
  },
  palette: {
    type: "dark"
  }
});

export default theme;
