import { combineReducers } from "redux";

import contractFunctions from "./contractFunctions";
import categories from "./categories";
import auth from "./auth";
import variables from "./variables";
import contractFunctionCategoryVariables from "./contractFunctionCategoryVariables";

export const reducers = combineReducers({
  auth,
  contractFunctions,
  categories,
  variables,
  contractFunctionCategoryVariables
});
