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
  CREATE_FCV,
  FETCH_ALL_FCV,
  START_LOADING_AI,
  GET_BY_AI,
  END_LOADING_AI,
  UPDATE_FCV,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const createFCV = (fcv, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createFCV(fcv);

    dispatch({ type: CREATE_FCV, payload: data });
    fcv;

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const retrieveByAI = (contractFunction, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_AI });
    const {
      data: { data },
    } = await api.retrieveByAI(contractFunction);

    dispatch({ type: GET_BY_AI, payload: data });
    dispatch({ type: END_LOADING_AI });

    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const getFCVs = (fcvId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchFCVs(fcvId);
    dispatch({ type: FETCH_ALL_FCV, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateFCV = (fcv) => async (dispatch) => {
  console.log(fcv)
  try {
    const { data } = await api.updateFCV(fcv);

    dispatch({ type: UPDATE_FCV, payload: data });
    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
