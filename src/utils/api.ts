import {getCookie,setCookie} from "./cookies";
import {TApiConfig, TRecoveryPassword, TUserInfo, TUserAuthorization, TDataOrderId} from "./types";

export class Api {
  _url: string;

  constructor({url}: TApiConfig) {
    this._url = url;
  }

  _chekRes(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
      "Authorization" : getCookie('accessToken'),
      'Content-Type' : 'application/json'
    }
  }

  postOrder(data: TDataOrderId) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      // @ts-ignore
      headers: this._getHeaders(),
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._chekRes(res)
      })
  }

  getIngredients() {
    return fetch(`${this._url}/ingredients`, {
      method: "GET",
    })
      .then(res => {
        return this._chekRes(res)
      })
  }

  resetPassword(data: string) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: data})
    })
      .then(res => {
        return this._chekRes(res)
      })
  }

  recoveryPassword(data: TRecoveryPassword) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        token: getCookie('accessToken')
      })
    })
      .then(res => {
        return this._chekRes(res)
      })
  }

  registration({name, email, password} : TUserInfo) {
    return fetch(this._url + "/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(this._chekRes)
  }

  authorization(data: TUserAuthorization) {
    return fetch(this._url + "/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      })
    })
      .then(this._chekRes)
  }

  logOut() {
    return fetch(this._url + "/auth/logout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(this._chekRes)
  }


  refreshToken = () => {
    return fetch(`${this._url}/auth/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._chekRes);
  };

  fetchWithRefresh = async (url: string, options: any) => {
    try {
      const res = await fetch(url, options);
      return await this._chekRes(res);
    } catch (err: any) {
      if (err === "Ошибка: 403") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          await Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await this._chekRes(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getUserInfo() {
    return this.fetchWithRefresh(`${this._url}/auth/user`, {
      method: "GET",
      headers: this._getHeaders()
    })
  }

  patchUserInfo(data: TUserInfo) {
    return this.fetchWithRefresh(`${this._url}/auth/user`,{
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    })
  }
}

const api = new Api({
  url: 'https://norma.nomoreparties.space/api',
})

export {api}
