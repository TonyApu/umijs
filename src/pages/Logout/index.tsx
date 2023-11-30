import { Button } from 'antd';
import { connect } from 'umi';
import styles from './style.logout.scss';
import { AUTHEN_SPACE } from '../Login/store/constants';

const LogoutPage = (props) => {
  const logout = () => {
    props.dispatch({
      type: `${AUTHEN_SPACE}/logout`,
    });
  };

  return (
    <div className={styles.container}>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default connect()(LogoutPage);
