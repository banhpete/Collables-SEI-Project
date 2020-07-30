import { setToken, getToken } from './tokenServices'
const BASE_URL = '/api/user/';

function signUp(user) {
  return fetch(
    BASE_URL + 'signup', {
    method: "POST",
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(user)
  })
    .then((res) => {
      if (res.ok) return res.json()

      throw new Error("Invalid Credentials")
    })
    .then(({ token }) => {
      setToken(token)
    })
}

function logIn(user) {
  return fetch(
    BASE_URL + 'login', {
    method: "POST",
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(user)
  }
  ).then((res) => {
    if (res.ok) return res.json()
    throw new Error("Invalid Credentials")
  }).then(({ token }) => {
    setToken(token)
  })
}

function getUserData() {
  let token = getToken()
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

function logOut() {
  localStorage.removeItem('token')
}

export { signUp, getUserData, logOut, logIn } 