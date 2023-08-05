import {
  FETCH_ALL_FCV,
  FETCH_BY_SEARCH,
  FETCH_CATEGORIES,
  CREATE_FCV,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  GET_BY_AI,
  UPDATE_FCV,
} from "../constants/actionTypes";

const contractFunctionCategoryVariables = (
  state = {
    isLoadingAi: false,
    isLoading: true,
    contractFunctionCategoryVariables: [],
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING_AI":
      return { ...state, isLoadingAi: true };
    case "END_LOADING_AI":
      window.location.reload();
      return { ...state, isLoadingAi: false };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case FETCH_ALL_FCV:
      return {
        ...state,
        contractFunctionCategoryVariables: action.payload.data,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case CREATE_FCV:
      return {
        ...state,
        contractFunctionCategoryVariables: [
          ...state.contractFunctionCategoryVariables,
          action.payload,
        ],
      };
    case GET_BY_AI:
      return {
        ...state,
        contractFunctionCategoryVariables: [
          ...state.contractFunctionCategoryVariables,
          action.payload,
        ],
      };
    case UPDATE_FCV:
      return {
        ...state,
        contractFunctionCategoryVariables:
          state.contractFunctionCategoryVariables.map((fcv) =>
            fcv.id === action.payload.id ? action.payload : fcv
          ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default contractFunctionCategoryVariables;
