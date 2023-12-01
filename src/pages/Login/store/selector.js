import { createSelector } from 'reselect';
import { AUTHEN_SPACE } from './constants';

const allState = (state) => state[AUTHEN_SPACE];

const selectorAuthen = createSelector(allState, (state) => state.login);

export { selectorAuthen };
