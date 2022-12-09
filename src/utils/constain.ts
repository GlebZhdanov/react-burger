export const KEYCODE_ESC = 'Escape';

export const SERVER_BASE_URL = 'wss://norma.nomoreparties.space/orders/all';

export const SERVER_BASE_URL_USER_ORDER = "wss://norma.nomoreparties.space/orders";

export function cleanTheDate(dateStr: string | null) {
  // @ts-ignore
  return new Date(dateStr).toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

export const dataTest =
  {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile:
      "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large:
      "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    key: '22d3b49abdacab0026a722cd'
  }

export const userDataTest = {
  user: {
    name: '',
    email: '',
  }
}

export const dataWs = {
  orders: [],
  total: 12314,
  totalToday: 131341
}

export const buttonOrderTest = '#button-order'


