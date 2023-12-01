import { Button } from 'antd';
import { connect } from 'umi';
import styles from './style.logout.scss';
import { selectorAuthen } from '../Login/store/selector';
import { logoutAction } from './store/actions'
import { createStructuredSelector } from 'reselect';

const LogoutPage = (props) => {
  const logout = () => {
    props.logout()
  };

  return (
    <div className={styles.container}>
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
