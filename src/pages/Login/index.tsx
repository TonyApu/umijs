import { Button, Form, Input } from 'antd';
import { connect } from 'dva';
import { createStructuredSelector } from 'reselect';
import { loginAction } from './store/actions';
import { selectorAuthen } from './store/selector';
import styles from './style.login.scss';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage = (props) => {
  const onFinish = (values: any) => {
    props.login(values);
  };

  return (
    <div className={styles.container}>
      <h2>Login Page</h2>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({ login: selectorAuthen });

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => dispatch(loginAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
