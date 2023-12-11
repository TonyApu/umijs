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

export async function getReservation(id) {
  return request(`/api/menu/reservation/${id}`, {
    method: 'POST',
  });
}

export async function submitForm(formValues) {
  return request('/api/menu/reservation', {
    method: 'POST',
    params: {
      values: formValues
    }
  });
}
