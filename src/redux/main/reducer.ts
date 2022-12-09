import {
  REGISTRATION_ERROR,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from "../types/action";
import {TMainState} from "../types/data";
import {TMainAction} from "./actions";

export const initialState: TMainState = {
  registrationRequest: false,
  registrationSuccess: false,
  registrationError: false,
  authorizationRequest: false,
  authorizationSuccess: false,
  authorizationError: false,
  userRequest: false,
  userSuccess: false,
  userError: false,
  patchUserRequest: false,
  patchUserSuccess: false,
  patchUserError: false,
  logOutUserRequest: false,
  logOutUserSuccess: false,
  logOutUserError: false,
  isToken: false,
  name: '',
  email: '',
}

export const reducer = (state = initialState, action: TMainAction): TMainState => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        registrationRequest: true,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        isToken: true,
      }
    case REGISTRATION_ERROR:
      return {
        ...state,
        registrationSuccess: false,
        registrationError: true,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        authorizationRequest: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        authorizationSuccess: true,
        isToken: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        authorizationSuccess: false,
        authorizationError: true,
      }
    case USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      }
    case USER_SUCCESS:
      return {
        ...state,
        userSuccess: true,
        authorizationSuccess: true,
        isToken: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
      }
    case USER_ERROR:
      return {
        ...state,
        userSuccess: false,
        userError: true,
      }
    case PATCH_USER_REQUEST:
      return {
        ...state,
        patchUserRequest: true,
      }
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        patchUserSuccess: true,
        isToken: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
      }
    case PATCH_USER_ERROR:
      return {
        ...state,
        patchUserSuccess: false,
        patchUserError: true,
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        logOutUserRequest: true,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        authorizationSuccess: false,
        logOutUserSuccess: true,
        registrationSuccess: false,
        isToken: false,
      }
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        logOutUserSuccess: false,
        logOutUserError: true,
      }
    default:
      return state
  }
}
