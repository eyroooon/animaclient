import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_CONTRACT_FUNCTION,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  UPDATE_CONTRACT,
  FETCH_ALL_CONTRACTS,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getContractFunction = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchContractFunction(id);

    dispatch({
      type: FETCH_CONTRACT_FUNCTION,
      payload: { contractFunction: data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getContractFunctions = (page, params) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log(page);
    const {
      data: { data },
    } = await api.fetchContractFunctions(page, params);

    dispatch({ type: FETCH_ALL_CONTRACTS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// export const getPostsBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

//     dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createPost = (post, history) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data } = await api.createPost(post);

//     dispatch({ type: CREATE, payload: data });

//     history.push(`/posts/${data._id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateContractFunctions =
  (id, contractFunction) => async (dispatch) => {
    try {
      const { data } = await api.updateContractFunctions(id, contractFunction);

      dispatch({ type: UPDATE_CONTRACT, payload: data });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

// export const likePost = (id) => async (dispatch) => {
//   const user = JSON.parse(localStorage.getItem('profile'));

//   try {
//     const { data } = await api.likePost(id, user?.token);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const commentPost = (value, id) => async (dispatch) => {
//   try {
//     const { data } = await api.comment(value, id);

//     dispatch({ type: COMMENT, payload: data });

//     return data.comments;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await await api.deletePost(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };
