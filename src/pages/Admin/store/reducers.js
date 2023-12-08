export const menuReducers = {
  saveRestaurant(state, { payload }) {
    return {
      ...state,
      restaurant: payload,
    };
  },
  saveCategory(state, { payload }) {
    return {
      ...state,
      category: payload,
    };
  },
  saveBreakfast(state, { payload }) {
    return {
      ...state,
      breakfast: payload,
    };
  },
  saveLunch(state, { payload }) {
    return {
      ...state,
      lunch: payload,
    };
  },
  saveDesert(state, { payload }) {
    return {
      ...state,
      desert: payload,
    };
  },
  saveReservation(state, { payload }) {
    return {
      ...state,
      reservation: payload,
    };
  },
};
