import { productEffects } from './store/effects';
import { productReducers } from './store/reducers'

export default {
  namespace: 'products',
  state: [],
  effects: productEffects,
  reducers: productReducers,
};
