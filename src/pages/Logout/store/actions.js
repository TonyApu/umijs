import { LOGOUT_ACTION } from './constants';
import { AUTHEN_SPACE } from '../../Login/store/constants'

export const logoutAction = () => ({
  type: `${AUTHEN_SPACE}/${LOGOUT_ACTION}`,
});
