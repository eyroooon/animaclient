import {
    FETCH_ALL_VARIABLES,
    FETCH_BY_SEARCH,
    FETCH_CATEGORIES,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    COMMENT,
  } from "../constants/actionTypes";
  
  const variables = (state = { isLoading: true, variables: [] }, action) => {
    switch (action.type) {
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
      case FETCH_ALL_VARIABLES:
        return {
          ...state,
          variables: action.payload.data,
        };
      case FETCH_CATEGORIES:
        return { ...state, categories: action.payload.categories };
      case CREATE:
        return { ...state, posts: [...state.posts, action.payload] };
      case UPDATE:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
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
  
  export default variables;
  