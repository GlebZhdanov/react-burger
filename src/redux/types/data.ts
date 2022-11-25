import {TIngredientData} from "../../utils/types";

export type TIngredientState = {
  data: Array<TIngredientData>,
  dataLoading: boolean,
  dataError: boolean | null,
}

export type TUserData = {
  success: boolean,
  user: {
    name: string,
    email: string
  }
}

export type TMainState = {
  registrationRequest: boolean,
  registrationSuccess: boolean,
  registrationError: boolean,
  authorizationRequest: boolean,
  authorizationSuccess: boolean,
  authorizationError: boolean,
  userRequest: boolean,
  userSuccess: boolean,
  userError: boolean,
  patchUserRequest: boolean,
  patchUserSuccess: boolean,
  patchUserError: boolean,
  logOutUserRequest: boolean,
  logOutUserSuccess: boolean,
  logOutUserError: boolean,
  isToken: boolean,
  name: string,
  email: string,
}

export type TOrderState = {
  orderNumber: number | null,
  orderLoading: boolean,
  orderError: boolean,
}

export type TPasswordState = {
  resetRequest : boolean,
  resetSuccess: boolean,
  resetError: boolean,
  recoveryRequest : boolean,
  recoverySuccess: boolean,
  recoveryError: boolean,
  resetPassword: string,
}

export type TWsState = {
  wsConnected: boolean,
  feedOrders: Array<TIngredientData>,
  total: number,
  totalToday: number,
  userOrders: Array<TIngredientData>,
}

export type TOrdersFeed = {
  ingredients: Array<TIngredientData>,
  _id: string | undefined;
  status: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  number: number;
}

export type TOrdersFeedPage = {
  total: number | any;
  totalToday: number | any;
  orders: Array<TIngredientData> | any[] ;
  ingredients: Array<string>,
  _id: string | undefined;
  status: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  number: number;
}

