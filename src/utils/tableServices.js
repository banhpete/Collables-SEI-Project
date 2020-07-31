import { getToken } from './tokenServices'
const BASE_URL = '/api/table';

function createTable(tableData) {
  return fetch(
    BASE_URL,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }),
      body: JSON.stringify(tableData)
    }
  )
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (data.errMsg) throw data.errMsg
      return data
    })
}

function getTableData(id) {
  return fetch(
    BASE_URL + '/' + id,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }),
    }
  )
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (data.errMsg) throw data.errMsg
      return data
    })
}

export { createTable, getTableData }