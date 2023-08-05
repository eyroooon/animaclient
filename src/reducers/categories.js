import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    FETCH_CATEGORIES,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    COMMENT,
  } from "../constants/actionTypes";
  
  const category = (state = { isLoading: true, categories: [] }, action) => {
    switch (action.type) {
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          categories: action.payload.data,
        };
      case FETCH_BY_SEARCH:
        return { ...state, posts: action.payload.data };
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
  
  export default category;
  