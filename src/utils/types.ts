export type TIngredientData = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  key: string | number;
  name: string;
  price: number;
  proteins: number;
  type: 'bun' | 'sauce' | 'main';
  __v: number;
  _id: string;
  index: number;
  id: string;
}

export type TApiConfig = {
  url: string,
}

export type TUserInfo = {
  name?: string
  email?: string,
  password?: string,
}

export type TDataOrderId = {
  "ingredients": Array<string>
}

export type TUserRegistration = {
  name: string,
  email: string,
  password: string,
}

export type TRecoveryPassword = {
  password: string,
  code: string,
}

export type TUserAuthorization = {
  email: string,
  password: string,
}

