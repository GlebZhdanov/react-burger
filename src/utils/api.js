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

  getIngredients() {
    return fetch(this._url, {
      method: "GET",
    })
    .then(res => {
      return this._chekRes(res)
    })
  }
}

const api = new Api({
  url: 'https://norma.nomoreparties.space/api/ingredients',
})

export {api}
