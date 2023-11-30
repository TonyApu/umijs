import { accountLogin } from '../../../services/authen';
import { notification } from 'antd';
import { history } from 'umi';

export const authenEffects = {
  *login(payload, { call, put }) {
    const res = accountLogin(payload);
    if (res.status === 200) {
      yield put({
        type: 'changeLoginStatus',
        payload: res.role,
      });
      history.push('/home');
    } else {
      notification.error({
        message: 'Sai tài khoản hoặc mật khẩu',
      });
    }
  },
  logout() {
    localStorage.removeItem('roles');
    history.push('/home');
  },
};
