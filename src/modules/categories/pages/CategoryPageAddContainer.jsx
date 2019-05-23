import { connect } from "react-redux";

import { addCategory } from "../actions";

import CategoryPage from "./CategoryPage";

export default connect(
  null, // TODO: serverErrorMessage
  { onSubmit: addCategory }
)(CategoryPage);
