import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Zinnebeeld",
    headline: {
      fontFamily: "ZinnebeeldBold"
    },
    button: {
      fontFamily: "ZinnebeeldBold"
    },
    title: {
      fontFamily: "ZinnebeeldBold"
    },
    subheading: {
      fontFamily: "ZinnebeeldBold"
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

export default theme;
