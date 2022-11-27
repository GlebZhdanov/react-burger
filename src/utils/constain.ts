export const KEYCODE_ESC = 'Escape';

export const SERVER_BASE_URL = 'wss://norma.nomoreparties.space/orders/all';

export const SERVER_BASE_URL_USER_ORDER = "wss://norma.nomoreparties.space/orders";

export function cleanTheDate(dateStr: string | null) {
  // @ts-ignore
  return new Date(dateStr).toISOString().replace(/T/, ' ').replace(/\..+/, '')
}
