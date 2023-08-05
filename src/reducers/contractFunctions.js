import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_CONTRACT_FUNCTION,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  UPDATE_CONTRACT,
  FETCH_ALL_CONTRACTS,
} from "../constants/actionTypes";

const contractFunction = (
  state = { isLoading: true, contractFunctions: [] },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case FETCH_ALL_CONTRACTS:
      return {
        ...state,
        contractFunctions: action.payload.data,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_CONTRACT_FUNCTION:
      return { ...state, contractFunction: action.payload.contractFunction };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_CONTRACT:
      return {
        ...state,
        contractFunctions: state.contractFunctions.map((contractFunction) =>
          contractFunction.id === action.payload.id
            ? action.payload
            : contractFunction
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

export default contractFunction;
