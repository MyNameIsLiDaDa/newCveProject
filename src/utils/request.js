import axios from 'axios'

const service = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://localhost:8007',
    timeout: 5000
})

export default service