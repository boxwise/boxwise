import { createMuiTheme } from "@material-ui/core/styles";

const fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';

const theme = createMuiTheme({
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
    type: "dark"
  }
});

export default theme;
