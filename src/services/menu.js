import request from '../utils/request'

export async function getRestaurant() {
  return request('/api/menu/restaurant');
}

export async function getCategory(id) {
  return request(`/api/menu/category/${id}`);
} 

export async function getBreakfast(category) {
  return request(`/api/menu/breakfast/${category}`);
}

export async function getLunch(category) {
  return request(`/api/menu/lunch/${category}`);
}

export async function getDesert(category) {
  return request(`/api/menu/desert/${category}`);
}