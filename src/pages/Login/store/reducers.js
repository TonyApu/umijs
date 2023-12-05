export const authenReducers = {
  changeLoginStatus(state, { payload }) {
    if (payload === 'GUEST') {
      localStorage.clear();
    } else {
      localStorage.setItem('roles', payload);
    } 
    return { ...state };
  },
};
