import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      console.error("Network Error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export const insertFlight = (payload) => api.post(`/flight/createflight`, payload);
export const getAllFlights = () => api.get(`/flight/getflights`);
export const getFlightById = (id) => api.get(`/flight/getflight/${id}`);
export const updateFlightbyId = (id, payload) => api.put(`/flight/updateflight/${id}`, payload);
export const deleteFlightById = (id) => api.delete(`/flight/deleteflight/${id}`);

export const confirmFlight = (payload) => api.post(`/reservation/createreservation`, payload);
export const editReservation = (id, payload) => api.put(`/reservation/updatereservationflight/${id}`, payload);
export const getUserInfo = (id) => api.get(`/user/u/${id}`);
export const updateUserInfo = (id, payload) => api.put(`/user/uupdate/${id}`, payload);
export const getReservationsById = (id) => api.get(`/reservation/getreservation/${id}`);
export const deleteReservationById = (id) => api.delete(`/reservation/deletereservation/${id}`);
export const payReservation = (id, payload) => api.post(`/reservation/sendmailpay/${id}`, payload);

export const loginUser = (payload) => api.post(`/user/ulogin`, payload);
export const registerUser = (payload) => api.post(`/user/ucreate`, payload);
export const validateEmail = (payload) => api.post("/user/checkEmail", payload);
export const validateUsername = (payload) => api.post("/user/checkUsername", payload);

export const updatePassword = (id, payload) => api.put(`/user/passupdate/${id}`, payload);

const apis = {
  insertFlight,
  getAllFlights,
  getFlightById,
  updateFlightbyId,
  deleteFlightById,
  confirmFlight,
  editReservation,
  getUserInfo,
  updateUserInfo,
  getReservationsById,
  deleteReservationById,
  payReservation,
  loginUser,
  registerUser,
  validateEmail,
  validateUsername,
  updatePassword,
};

export default apis;
