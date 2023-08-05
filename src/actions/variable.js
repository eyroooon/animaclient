import {
    START_LOADING,
    END_LOADING,
    FETCH_ALL_VARIABLES,
    FETCH_ALL,
    FETCH_CONTRACT_FUNCTION,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    COMMENT,
  } from "../constants/actionTypes";
  import * as api from "../api/index.js";
  
  // export const getContractFunction = (id) => async (dispatch) => {
  //   try {
  //     dispatch({ type: START_LOADING });
  
  //     const { data } = await api.fetchContractFunction(id);
  
  //     dispatch({
  //       type: FETCH_CONTRACT_FUNCTION,
  //       payload: { contractFunction: data },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  export const getVariables = (categoryId) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: { data, currentPage, numberOfPages },
      } = await api.fetchVariables(categoryId);
      dispatch({ type: FETCH_ALL_VARIABLES, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  