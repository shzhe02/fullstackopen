import axios from "axios"

const url = "http://localhost:3001/persons"

const fetch = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const add = (data) => {
  const request = axios.post(url, data)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then((response) => response.data)
}

const utils = { fetch, add, remove }

export default utils
