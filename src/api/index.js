import request from '@/utils/request'

// export function login(data) {
//     return request({
//       url: '/user/login',
//       method: 'post',
//       data
//     })
// 产商请求接口
export function vendorsData () {
    return request({
        url: '/cyber/vendors?page=1&size=10000',
        method: 'get'
    })
}
// 产品请求接口
export function productsData (str) {
    return request({
        url: `/cyber/products?vendor=${ str }&page=1&size=10000`,
        method: 'get'
    })
}
// 版本请求接口
export function versionsData (vendor, product) {
    return request({
        url: `/cyber/versions?vendor=${ vendor }&product=${ product }&page=1&size=10000`,
        method: 'get'
    })
}

// cve 数据;
export function CveData (id) {
    return request({
        url: `/cyber/cve_info?cpe_id=${ id }&page=1&size=10000`,
        method: 'get'
    })
}

// cwe 数据;
export function CweData (id) {
    return request({
        url: `/cyber/cwe_info?cve_id=${ id }&page=1&size=10000`,
        method: 'get'
    })
}

// capec 数据;
export function capecData (id) {
    return request({
        url: `/cyber/capec_info?cwe_id=${ id }&page=1&size=10000`,
        method: 'get'
    })
}

// cce 数据;
export function cceData (id) {
    return request({
        url: `/cyber/cce_info?cpe_id=${ id }&page=1&size=10000`,
        method: 'get'
    })
}
