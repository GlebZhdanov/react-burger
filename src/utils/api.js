import {getCookie,setCookie} from "./cookies";

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _chekRes(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  _getHeaders() {
    return {
      "Authorization" : getCookie('accessToken'),
      'Content-Type' : 'application/json'
    }
  }

  postOrder(data) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: this._headers,
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

  resetPassword(data) {
    return fetch(`${this._url}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email: data})
    })
    .then(res => {
      return this._chekRes(res)
    })
  }

  recoveryPassword(data) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        token: getCookie('accessToken')
      })
    })
    .then(res => {
      return this._chekRes(res)
    })
  }

  registration({name, email, password}) {
    return fetch(this._url + "/auth/register", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then(this._chekRes)
  }

  authorization(data) {
    return fetch(this._url + "/auth/login", {
      method: "POST",
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
    .then(this._chekRes)
  }

  refreshToken = () => {
    return fetch(`${this._url}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._chekRes);
  };

  fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this._chekRes(res);
    } catch (err) {
      if (err.message === "jwt expired") {
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

    // return fetch(`${this._url}/auth/user`, {
    //   method: "GET",
    //   headers: this._getHeaders()
    // })
    // .then(this._chekRes)
  }

  patchUserInfo(data) {
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
  headers: {
    'Content-Type': 'application/json',
  }
})

export {api}

