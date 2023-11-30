import { createSelector, } from 'reselect';
import { PRODUCT_SPACE } from './constants'
 
const allState = (state) => state[PRODUCT_SPACE];
 
const selectorProducts = createSelector(allState, (state) => state.products);
 
export {
 selectorProducts,
};