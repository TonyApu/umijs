import { Button } from 'antd';
import { connect } from 'umi';
import { selectorAuthen } from '../Login/store/selector';
import { logoutAction } from './store/actions'
import { createStructuredSelector } from 'reselect';
import styles from './logout.less';

const LogoutPage = (props) => {
  const logout = () => {
    props.logout()
  };

  return (
    <div>
      <h1 className={styles.title}>Page Logout</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({ login: selectorAuthen });

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
