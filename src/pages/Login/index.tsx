import { Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './style.login.scss'
import { AUTHEN_SPACE } from './store/constants';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage = ({ dispatch }) => {
  const onFinish = (values: any) => {
    dispatch({
      type: `${AUTHEN_SPACE}/login`,
      payload: values,
    });
  };
  
  return (
    <div className={styles.container}>
      <h2>Login Page</h2>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
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

export default connect(({}) => ({}))(LoginPage);
