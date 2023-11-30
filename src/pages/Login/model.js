import { authenEffects } from './store/effects';
import { authenReducers } from './store/reducers';
import { AUTHEN_SPACE } from './store/constants'

export default {
  namespace: AUTHEN_SPACE,
  state: [],
  effects: authenEffects,
  reducers: authenReducers,
};
