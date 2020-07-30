const BASE_URL = '/api/tables';

function createTable(table) {
  return fetch(
    BASE_URL,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(table)
    }
  )
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error('Invalid Inputs')
    })
    .then((data) => {
      return data
    })
}

export { createTable }