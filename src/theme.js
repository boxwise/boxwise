import { createMuiTheme } from "@material-ui/core/styles";

export const fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';

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
    useNextVariants: true,
    fontFamily,
    h5: {
      fontFamily,
      fontWeight: 700
    },
    button: {
      fontFamily,
      fontWeight: 700
    },
    h6: {
      fontFamily
    },
    subtitle1: {
      fontFamily
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
    useNextVariants: true,
    fontFamily
  },
  palette: {
    type: "dark"
  }
});

export default theme;
