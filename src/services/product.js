import request from '../utils/request'

export async function getMenu() {
    return request('/api/products');
}

export async function deleteItem(id) {
    return request(`/api/products/${id}`,{
        method: 'DELETE',
    })
}