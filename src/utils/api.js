export class Api {
  constructor(config) {
    this._url = config.url;
  }

  _chekRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(console.log(`Ошибка сервера: ${res.status}`))
  }

  postOrder(data) {
    return fetch(`${this._url}/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
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
}

const api = new Api({
  url: 'https://norma.nomoreparties.space/api',
})

export {api}
