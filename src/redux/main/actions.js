import {api} from "../../utils/api";
import {deleteCookie,setCookie} from "../../utils/cookies";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_ERROR = "PATCH_USER_ERROR";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

export const registrationUser = (data) => (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUEST,
  })
  api.registration(data)
  .then((res) => {
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: REGISTRATION_ERROR
    })
  })
}

export const authorizationUser = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  })
  api.authorization(data)
  .then((res) => {
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: LOGIN_ERROR
    })
  })
}

export const getUser = () => async (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  })
  // try {
  //   const res = await api.getUserInfo();
  //   console.log(res)
  //   dispatch({
  //     type: USER_SUCCESS,
  //     payload: res,
  //   })
  // } catch (err) {
  //   dispatch({
  //     type: USER_ERROR
  //   })
  // }
  api.getUserInfo()
  .then((res) => {
    dispatch({
      type: USER_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: USER_ERROR
    })
  })
}

export const patchUser = (data) => (dispatch) => {
  dispatch({
    type: PATCH_USER_REQUEST,
  })
  api.patchUserInfo(data)
  .then((res) => {
    dispatch({
      type: PATCH_USER_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: PATCH_USER_ERROR
    })
  })
}

export const loginOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER_REQUEST,
  })
  api.logOut()
  .then((res) => {
    localStorage.clear();
    deleteCookie('accessToken')
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: res,
    })
  })
  .catch(() => {
    dispatch({
      type: LOGOUT_USER_ERROR
    })
  })
}
