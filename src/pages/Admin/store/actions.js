import {
  FETCH_BREAKFAST_ACTION,
  FETCH_CATEGORY_ACTION,
  FETCH_DESERT_ACTION,
  FETCH_LUNCH_ACTION,
  FETCH_RESERVATION_ACTION,
  FETCH_RESTAURANT_ACTION,
  MENU_SPACE,
  SUBMIT_FORM_ACTION,
} from './constants';

export const fetchRestaurantAction = () => ({
  type: `${MENU_SPACE}/${FETCH_RESTAURANT_ACTION}`,
});

export const fetchCategoryAction = (id) => ({
  type: `${MENU_SPACE}/${FETCH_CATEGORY_ACTION}`,
  payload: id,
});

export const fetchBreakfastAction = (category) => ({
  type: `${MENU_SPACE}/${FETCH_BREAKFAST_ACTION}`,
  payload: category,
});

export const fetchLunchAction = (category) => ({
  type: `${MENU_SPACE}/${FETCH_LUNCH_ACTION}`,
  payload: category,
});

export const fetchDesertAction = (category) => ({
  type: `${MENU_SPACE}/${FETCH_DESERT_ACTION}`,
  payload: category,
});

export const fetchReservationAction = (id, resolve) => ({
  type: `${MENU_SPACE}/${FETCH_RESERVATION_ACTION}`,
  payload: id,
  resolve,
});

export const submitFormAction = (id) => ({
  type: `${MENU_SPACE}/${SUBMIT_FORM_ACTION}`,
  payload: id,
});
