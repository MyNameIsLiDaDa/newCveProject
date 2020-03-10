import request from '@/utils/request'

// export function login(data) {
//     return request({
//       url: '/user/login',
//       method: 'post',
//       data
//     })

export function vendorsData () {
    return request({
        url: '/cyber/vendors?page=1&size=10000',
        method: 'get'
    })
}