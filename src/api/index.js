import request from '@/utils/request'

// export function login(data) {
//     return request({
//       url: '/user/login',
//       method: 'post',
//       data
//     })
// 产商请求接口
export function vendorsData (page) {
    return request({
        url: `/cyber/vendors?page=${ page }&size=50`,
        method: 'get'
    })
}
// 产商查询接口
export function vendorSearchApi (data, page) {
    return request({
        url: `/cyber/vendors?vendor_like=${ data }&page=${ page }&size=50`
    })
}
// 产品请求接口
export function productsData (item) {
    return request({
        url: `/cyber/products?vendor=${ item.vendor }&pattern=${ item.pattern }&page=1&size=50`,
        method: 'get'
    })
}
// 版本请求接口
export function versionsData (vendor, product) {
    return request({
        url: `/cyber/versions?vendor=${ vendor }&product=${ product }&page=1&size=50`,
        method: 'get'
    })
}

// cve 数据;
export function CveData (id) {
    return request({
        url: `/cyber/cve_info?cpe_id=${ id }&page=1&size=50`,
        method: 'get'
    })
}

// cwe 数据;
export function CweData (id) {
    return request({
        url: `/cyber/cwe_info?cve_id=${ id }&page=1&size=50`,
        method: 'get'
    })
}

// capec 数据;
export function capecData (id) {
    return request({
        url: `/cyber/capec_info?cwe_id=${ id }&page=1&size=50`,
        method: 'get'
    })
}

// cce 数据;
export function cceData (id) {
    return request({
        url: `/cyber/cce_info?cpe_id=${ id }&page=1&size=50`,
        method: 'get'
    })
}

// techniques 技术
export function techniquesData (id) {
    return request({
        url: `/cyber/techniques?capec_id=${ id }`,
        method: 'get'
    })
}

// tactics 战术
export function tacticsData (name) {
    return request({
        url: `/cyber/tactics?phase_name=${ name }`,
        method: 'get'
    })
}

// next page api
// 所有战术api
export function allTactics () {
    return request({
        url: `/cyber/tactics`,
        method: 'get'
    })
}
// 对应的技术 api
export function techniquesNext (name) {
    return request({
        url: `/cyber/techniques?phase_name=${ name }`,
        method: 'get'
    })
}
// 技术对应的capec 需要capec_id
export function capec_info (id) {
    return request({
        url: `/cyber/capec_info?capec_id=${ id }`,
        method: 'get'
    })
}
// capec对应的cwe 需要CAPEC_id[num]
export function cwe_info (id) {
    return request({
        url: `/cyber/cwe_info?capec_id=${ id }&page=1&size=10`,
        method: 'get'
    })
}
// cwe对应的cve 需要cew_id[num]
export function cve_info (id) {
    return request({
        url: `/cyber/cve_info?cwe_id=${ id }&page=1&size=10`,
        method: 'get'
    })
}
// cve对应的cpe 需要CVE-2017-1[name]id
export function cpe_info (id) {
    return request({
        url: `/cyber/cpe_info?cve_id=${ id }&page=1&size=10`,
    })
}
// cwe对应的cve 需要cew_id[num]
export function vendor_detail ({vendor, version}) {
    return request({
        url: `/cyber/vendor_detail?vendor=${ vendor }&version=${ version }`,
        method: 'get'
    })
}