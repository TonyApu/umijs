export const authenReducers = {
  changeLoginStatus(state, { payload }) {
    console.log('payload: ', payload);
    localStorage.setItem('roles', payload);
    return { ...state };
  },
};
