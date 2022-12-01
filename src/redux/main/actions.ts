import {api} from "../../utils/api";
import {deleteCookie,setCookie} from "../../utils/cookies";
import {AppDispatch, AppThunk} from "../types";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  PATCH_USER_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS
} from "../types/action";
import {TUserData} from "../types/data";
import {TUserAuthorization, TUserInfo, TUserRegistration} from "../../utils/types";

export interface IRegistrationUserRequestAction {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationUserSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
}

export interface IRegistrationUserFailedAction {
  readonly type: typeof REGISTRATION_ERROR;
}

export interface IAuthorizationUserRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface IAuthorizationUserSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  payload: TUserData
}

export interface IAuthorizationUserFailedAction {
  readonly type: typeof LOGIN_ERROR;
}

export interface IGetUserRequestAction {
  readonly type: typeof USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof USER_SUCCESS;
  payload: TUserData
}

export interface IGetUserFailedAction {
  readonly type: typeof USER_ERROR;
}

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  payload: TUserData
}

export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_ERROR;
}

export interface ILoginOutRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILoginOutSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILoginOutFailedAction {
  readonly type: typeof LOGOUT_USER_ERROR;
}

export type TMainAction =
  | IRegistrationUserRequestAction
  | IRegistrationUserSuccessAction
  | IRegistrationUserFailedAction
  | IAuthorizationUserRequestAction
  | IAuthorizationUserSuccessAction
  | IAuthorizationUserFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPatchUserFailedAction
  | ILoginOutRequestAction
  | ILoginOutSuccessAction
  | ILoginOutFailedAction

export const registrationUserRequestAction = () : IRegistrationUserRequestAction => ({
  type: REGISTRATION_REQUEST,
})

export const registrationUserSuccessAction = () : IRegistrationUserSuccessAction => ({
  type: REGISTRATION_SUCCESS,
})

export const registrationUserFailedAction = () : IRegistrationUserFailedAction => ({
  type: REGISTRATION_ERROR,
})

export const authorizationUserRequestAction = () : IAuthorizationUserRequestAction => ({
  type: LOGIN_REQUEST,
})

export const authorizationUserSuccessAction = (dataUser: TUserData) : IAuthorizationUserSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: dataUser,
})

export const authorizationUserFailedAction = () : IAuthorizationUserFailedAction => ({
  type: LOGIN_ERROR,
})

export const getUserRequestAction = () : IGetUserRequestAction => ({
  type: USER_REQUEST,
})

export const getUserSuccessAction = (dataUser: TUserData) : IGetUserSuccessAction => ({
  type: USER_SUCCESS,
  payload: dataUser,
})

export const getUserFailedAction = () : IGetUserFailedAction => ({
  type: USER_ERROR,
})

export const patchUserRequestAction = () : IPatchUserRequestAction => ({
  type: PATCH_USER_REQUEST,
})

export const patchUserSuccessAction = (dataUser: TUserData) : IPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  payload: dataUser,
})

export const patchUserFailedAction = () : IPatchUserFailedAction => ({
  type: PATCH_USER_ERROR,
})

export const loginOutRequestAction = () : ILoginOutRequestAction => ({
  type: LOGOUT_USER_REQUEST,
})

export const loginOutSuccessAction = () : ILoginOutSuccessAction => ({
  type: LOGOUT_USER_SUCCESS,
})

export const loginOutFailedAction = () : ILoginOutFailedAction => ({
  type: LOGOUT_USER_ERROR,
})


export const registrationUser = (data: TUserRegistration): AppThunk => (dispatch: AppDispatch) => {
  dispatch(registrationUserRequestAction())
  return api.registration(data)
  .then((res) => {
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    dispatch(registrationUserSuccessAction())
  })
  .catch(() => {
    dispatch(registrationUserFailedAction())
  })
}

export const authorizationUser = (data: TUserAuthorization): AppThunk => (dispatch: AppDispatch) => {
  dispatch(authorizationUserRequestAction());
  return api.authorization(data)
  .then((res) => {
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    dispatch(authorizationUserSuccessAction(res))
  })
  .catch(() => {
    dispatch(authorizationUserFailedAction())
  })
}

export const getUser = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(getUserRequestAction())
  return api.getUserInfo()
  .then((res) => {
    dispatch(getUserSuccessAction(res))
  })
  .catch(() => {
    dispatch(getUserFailedAction())
  })
}

export const patchUser = (data: TUserInfo): AppThunk => (dispatch: AppDispatch) => {
  dispatch(patchUserRequestAction())
  return api.patchUserInfo(data)
  .then((res) => {
    dispatch(patchUserSuccessAction(res))
  })
  .catch(() => {
    dispatch(patchUserFailedAction())
  })
}

export const loginOut = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loginOutRequestAction())
  return api.logOut()
  .then(() => {
    localStorage.clear();
    deleteCookie('accessToken')
    dispatch(loginOutSuccessAction())
  })
  .catch(() => {
    dispatch(loginOutFailedAction())
  })
}
