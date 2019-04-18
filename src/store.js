import { configureStore } from "redux-starter-kit";
import profile from "./reducers/profile";
import auth from "./features/auth";
import boxes from "./reducers/boxes";
import products from "./reducers/products";

export default configureStore({
  reducer: {
    products,
    profile,
    user: auth, // for now keep name the same
    boxes
  }
});
