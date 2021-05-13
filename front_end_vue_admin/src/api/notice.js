import request from '@/utils/request'

export function postPublishNotice(param){
    return request({
        url: 'publishNotice',
        method: 'post',
        params: {
            content: param
        }
    })
}

export function getNotices(){
    return request({
        url: 'notices',
        method: 'get',
    })
}

export function delNotice(noticeId){
    return request({
        url: 'notice',
        method: 'delete',
        params: {
            id: noticeId
        }
    })
}