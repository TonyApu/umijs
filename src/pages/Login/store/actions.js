import { AUTHEN_SPACE, LOGIN_ACTION } from './constants';

export const loginAction = (values) => ({
  type: `${AUTHEN_SPACE}/${LOGIN_ACTION}`,
  payload: values,
});
