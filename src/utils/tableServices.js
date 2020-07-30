const BASE_URL = '/api/table';

function createTable(tableData) {
  return fetch(
    BASE_URL,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(tableData)
    }
  )
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      return data
    })
}

export { createTable }