import { Outlet, Navigate } from 'umi';

export default (props) => {
  const isLogin = localStorage.getItem('roles') !== null;
  console.log('run here');
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
