import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile") !== null) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).result.token
//     }`;
//   }

//   return req;
// });

export const fetchContractFunctions = (
  page,
  { filter, sort, orderBy, search }
) =>
  API.get(
    `/contract-functions?page=${page}&filter=${filter}&sort=${sort}&orderBy=${orderBy}&search=${search}`
  );

export const fetchContractFunction = (id) =>
  API.get(`/contract-functions/${id}`);

export const fetchCategories = () => API.get(`/categories`);

export const fetchVariables = (categoryId) =>
  API.get(`/variables?categoryId=${categoryId}`);

export const fetchFCVs = (fcvId) => API.get(`/fcv?fcvId=${fcvId}`);

export const createFCV = (fcv) => API.post("/fcv", fcv);
export const retrieveByAI = (contractFunction) =>
  API.post("/fcv/retrieveByAI", contractFunction);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updateContractFunctions = (id, updatedContractFunction) =>
  API.patch(`/contract-functions/${id}`, updatedContractFunction);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updateFCV = (fcv) => API.patch(`/fcv/update`, fcv);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
