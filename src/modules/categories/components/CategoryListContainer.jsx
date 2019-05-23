import { connect } from "react-redux";

import { deleteCategory, getAllCategories } from "../actions";
import { getAllCategoriesFromState } from "../reducer";

import CategoryList from "./CategoryList";

export default connect(
  state => ({ categories: getAllCategoriesFromState(state) }),
  { deleteCategory, getAllCategories }
)(CategoryList);
