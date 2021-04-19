import cookie from '../util/cookie.js'
const axios = require('axios')

const createError = require('../util/util.js')

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(response => {
      const data = response.data
      if (!data) {
        reject(createError(400, 'no data'))
        return
      }
      resolve(data)
    }).catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        reject(createError(401, 'need login'))
        return
      }
      if (err.response.status === 400) {
        reject(createError(400, err.response.data.message))
        return
      }
      if (err.response.status === 404 && err.response.data.detail === 'Not found.') {
        resolve({status: false, detail: '该用户不存在'})
        return
      }
      if (err.response.status === 404) {
        reject(createError(404, '路径错误'))
      }
    })
  })
}

module.exports = {
  addBookType (data) {
    return handleRequest(request.post('api/booktype', data))
  },
  getBookTypes (data) {
    return handleRequest(request.get(`api/booktypes`, data))
  },
  addBook (data) {
    return handleRequest(request.post('api/book', data))
  },
  getBooks (cId, pageNo, pageSize) {
    return handleRequest(request.get(`api/books?cId=${cId}&pageNo=${pageNo}&pageSize=${pageSize}`))
  },
  login (data) {
    return handleRequest(request.post('api/user', data))
  },
  register(data) {
    return handleRequest(request.post('api/register', data))
  },
  queryCarId(uid) {
    return handleRequest(request.get(`api/car/${uid}`))
  },
  addBookToCar(data) {
    return handleRequest(request.post('api/batch', data))
  },
  queryCarBooks(carId, state) {
    return handleRequest(request.get(`api/batch?carId=${carId}&state=${state}`))
  },
  removeBatch(batchId) {
    return handleRequest(request.delete(`api/batch/${batchId}`))
  },
  updateBatch(data) {
    return handleRequest(request.put(`api/batch`, data))
  },
  saveOrder(data) {
    return handleRequest(request.post('api/order', data))
  },
  queryOrder(userId, state) {
    return handleRequest(request.get(userId?`api/order?userId=${userId}&state=${state}`:`api/order`))
  },
  editOrder(data) {
    return handleRequest(request.put(`api/order`, data))
  }
}
