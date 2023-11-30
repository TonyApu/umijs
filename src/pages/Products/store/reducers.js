export const productReducers = {
  save(state, { payload }) {
    return {
      ...state,
      products: payload,
    };
  },
};
