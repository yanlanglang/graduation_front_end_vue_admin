import request from '@/utils/request'

//获取所有用户上传的文章
export function getAllCustomerArticles(page) {
    return request({
        url: 'allCustomerArticles',
        method: 'get',
        params: {
            page: page
        }
    })
}

//获取所有管理员上传的文章
export function getAllAdminArticles(page) {
    return request({
        url: 'allAdminArticles',
        method: 'get',
        params: {
            page: page
        }
    })
}

//删除指定用户的文章
export function delArticle(id) {
    return request({
        url: 'article',
        method: 'delete',
        params: {
            id: id
        }
    })
}

export function postPublishArticle(data) {
    return request ({
        url: 'publishArticle',
        method: 'post',
        params: {
            title: data.title,
            description: data.description,
            content: data.content,
            value: data.value
        }
    })
}

export function getTypes() {
    return request ({
        url: 'types',
        method: 'get'
    })
}