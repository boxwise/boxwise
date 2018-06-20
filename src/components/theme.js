import { createMuiTheme } from "@material-ui/core/styles";

const fontFamily = '"Open Sans", Helvetica, Arial, sans-serif';

const theme = createMuiTheme({
  typography: {
    fontFamily: fontFamily
  },
  palette: {
    type: "dark"
  }
});

export default theme;
