import { notification } from 'antd';
import { history } from 'umi';
import { accountLogin } from '../../../services/authen';

export const authenEffects = {
  *login(payload, { call, put }) {
    const res = accountLogin(payload);
    if (res.status === 200) {
      yield put({
        type: 'changeLoginStatus',
        payload: res.role,
      });
      localStorage.setItem('access_token', 'Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
      history.push('/home')  
      window.location.reload();
    } else {
      notification.error({
        message: 'Sai tài khoản hoặc mật khẩu',
      });
    }
  },
  *logout(_, { call, put }) {
    localStorage.removeItem('roles');
    yield put({
      type: 'changeLoginStatus',
      payload: 'GUEST'
    });
    history.push('/home');
  },
};
