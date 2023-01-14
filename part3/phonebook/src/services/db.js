import axios from "axios"

const url = "/api/persons"

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

const update = (data, id) => {
  const request = axios.put(`${url}/${id}`, data)
  return request.then((response) => response.data)
}

const utils = { fetch, add, remove, update }

export default utils
