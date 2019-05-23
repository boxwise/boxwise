import { connect } from "react-redux";

import { updateCategory, getAllCategories } from "../actions";
import { getCategoryFromState } from "../reducer";

import CategoryPage from "./CategoryPage";

export default connect(
  // TODO: serverErrorMessage
  (state, ownProps) => ({
    categoryToEdit: getCategoryFromState(
      state,
      ownProps.match.params.categoryId
    )
  }),
  (dispatch, ownProps) => ({
    onSubmit: values =>
      dispatch(updateCategory({ id: ownProps.categoryId, ...values })),
    categoryList: () => dispatch(getAllCategories())
  })
)(CategoryPage);
