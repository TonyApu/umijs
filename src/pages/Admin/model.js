import { menuReducers } from './store/reducers'
import { menuEffects } from './store/effects'
export default {
    namespace: 'menu',
    state: [],
    effects: menuEffects,
    reducers: menuReducers,
  };