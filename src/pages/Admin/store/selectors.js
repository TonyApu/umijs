import { createSelector } from 'reselect';
import { MENU_SPACE } from './constants';

const allState = (state) => state[MENU_SPACE];

const selectorRestaurant = createSelector(
  allState,
  (state) => state.restaurant,
);
const selectorCategory = createSelector(allState, (state) => state.category);
const selectorBreakfast = createSelector(allState, (state) => state.breakfast);
const selectorLunch = createSelector(allState, (state) => state.lunch);
const selectorDesert = createSelector(allState, (state) => state.desert);
const selectorReservation = createSelector(allState, (state) => state.reservation);

export {
  selectorBreakfast,
  selectorCategory,
  selectorDesert,
  selectorLunch,
  selectorRestaurant,
  selectorReservation
};
