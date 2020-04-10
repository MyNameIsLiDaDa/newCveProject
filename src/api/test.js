import request from '@/utils/request'

export function userInfo () {
    return request({
        url: `/dynmatch/ajax/index_vip_member.php`,
        method: 'get'
    })
}