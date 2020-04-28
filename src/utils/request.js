import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://localhost:8007',
  baseURL: process.env.BASE_API,
  timeout: 50000
})

// const service = axios.create({
//     // baseURL: 'http://localhost:3000',
//     baseURL: 'https://www.jiayuan.com',
//     timeout: 5000
// })
export default service
