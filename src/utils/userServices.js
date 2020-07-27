import { setToken, getToken } from './tokenServices'
const BASE_URL = '/api/users/';

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

function getUser() {
  let token = getToken()
  console.log(token)
  return token ? JSON.parse(atob(token.split('.')[1])).user.username : null
}

function logOut() {
  localStorage.removeItem('token')
}

export { signUp, getUser, logOut } 