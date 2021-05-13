import request from '@/utils/request'

export function getPublishExample(isBlockly) {

    return request ({
        url: 'examples',
        method: 'get',
        params: {
            isBlockly: isBlockly
        }
    })
}


//删除案例
export function delExample(exampleId) {
    return request({
        url: 'example',
        method: 'delete',
        params: {
            id: exampleId
        }
    })
}