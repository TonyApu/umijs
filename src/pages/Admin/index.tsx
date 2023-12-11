import { dateFormat } from '@/constants';
import { CheckOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from '@umijs/max';
import { useDebounce, useUpdateEffect } from 'ahooks';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Switch,
  Typography,
  notification,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { createStructuredSelector } from 'reselect';

import { getReservation, submitForm } from '@/services/menu';
import {
  fetchBreakfastAction,
  fetchCategoryAction,
  fetchDesertAction,
  fetchLunchAction,
  fetchReservationAction,
  fetchRestaurantAction,
} from './store/actions';
import {
  selectorBreakfast,
  selectorCategory,
  selectorDesert,
  selectorLunch,
  selectorReservation,
  selectorRestaurant,
} from './store/selectors';
import styles from './style.admin.scss';

const Menu = (props: any) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  // const { Option } = Select;
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const debouncedValue = useDebounce(code, { wait: 2000 });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const restaurant = Form.useWatch('restaurant', form);
  const category = Form.useWatch('category', form);

  useEffect(() => {
    props.fetchRestaurant();
  }, []);

  useUpdateEffect(() => {
    props.fetchCategory(restaurant);
    form.setFieldValue('category', undefined);
  }, [restaurant]);

  useUpdateEffect(() => {
    props.fetchBreakfast(category);
    form.setFieldValue('breakfast', undefined);
    props.fetchLunch(category);
    form.setFieldValue('lunch', undefined);
    props.fetchDesert(category);
    form.setFieldValue('desert', undefined);
  }, [category]);

  const handleReservationCodeChange = (id: string) => {
    setLoading(true);
    if (id) {
      let code = id;
      while (code.length < 8) {
        code = '0' + code;
      }
      form.setFieldValue('code', code);
      getReservation(code).then((res) => {
        if (res.data) {
          setIsChecked(true);
          form.setFieldsValue({
            ...res.data,
            date: moment(res.data.date, dateFormat),
          });
        } else {
          form.setFieldValue('place', '');
          form.setFieldValue('quantity', '');
          form.setFieldValue('date', null);
          form.setFieldValue('payment', '');
          notification.error({
            message: 'No reservation found with code',
          });
        }
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useUpdateEffect(() => {
    setIsChecked(false);
    handleReservationCodeChange(debouncedValue);
  }, [debouncedValue]);

  const handleSwitchChange = (values: any) => {
    form.setFieldValue('restaurant', undefined);
    setActive(values);
  };

  const onFinish = (values: any) => {
    submitForm(values).then(() => {
      notification.success({
        message: 'Submit successfully!',
      });
    });
  };

  const handleDelete = () => {
    setIsChecked(false);
    form.resetFields();
  };

  useHotkeys('ctrl+r', () => handleDelete());
  useHotkeys('ctrl+s', () => {
    form.submit();
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Title level={2} className={styles.title}>
          Page admin
        </Title>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className={styles.buttonWrapper}>
          <Button
            icon={<ReloadOutlined/>}
            onClick={handleDelete}
          >
            Delete Screen (CTRL + R)
          </Button>
          <Button
            type="primary"
            className={styles.saveButton}
            icon={<SaveOutlined />}
            htmlType="submit"
          >
            Save (CTRL + S)
          </Button>
        </div>
        <div className={styles.sectionTitle}>
          <Title level={5}>Menu</Title>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="restaurant"
                label="Restaurant"
                rules={[
                  { required: active, message: 'Restaurant is required!' },
                ]}
              >
                <Select
                  placeholder="-select-"
                  options={props.restaurant}
                  disabled={!active}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Date 1"
                name="date1"
                rules={[{ required: active, message: 'Date 1 là bắt buộc!' }]}
              >
                <DatePicker
                  placeholder="-select date-"
                  className={styles.datePicker}
                  disabled={!active}
                />
              </Form.Item>
            </Col>
            <Col span={5}></Col>
            <Col span={5}></Col>
            <Col span={4}></Col>
          </Row>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: active, message: 'Category is required!' }]}
              >
                <Select
                  placeholder="-select-"
                  options={props.category}
                  disabled={!restaurant}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="breakfast"
                label="Breakfast"
                rules={[
                  { required: active, message: 'Breakfast is required!' },
                ]}
              >
                <Select
                  placeholder="-select-"
                  options={props.breakfast}
                  disabled={!category}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="lunch"
                label="Lunch"
                rules={[{ required: active, message: 'Lunch is required!' }]}
              >
                <Select
                  placeholder="-select-"
                  options={props.lunch}
                  disabled={!category}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="desert"
                label="Desert"
                rules={[{ required: active, message: 'Desert is required!' }]}
              >
                <Select
                  placeholder="-select-"
                  options={props.desert}
                  disabled={!category}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="active" label="Active">
                <Switch
                  checkedChildren="O"
                  unCheckedChildren="X"
                  onChange={handleSwitchChange}
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className={styles.sectionTitle}>
          <Title level={5}>Reservation</Title>
        </div>

        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              {loading ? (
                <div className={styles.rowLoading}>
                  <Spin />
                </div>
              ) : (
                <Form.Item
                  name="code"
                  label="Reservation Code"
                  rules={[
                    {
                      required: true,
                      message: 'Reservation code is required!',
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    suffix={isChecked && <CheckOutlined style={{ color: 'green', fontSize: 16 }} />}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={5}>
              <Form.Item name="place" label="Place">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Date" name="date">
                <DatePicker
                  placeholder=""
                  format={dateFormat}
                  className={styles.datePicker}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="quantity" label="Quantity">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="payment" label="Payment">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="option7"
                label="Option 7"
                rules={[{ required: true, message: 'Option 7 là bắt buộc!' }]}
              >
                <Select placeholder="-select-">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Input 5" name="input5">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Date 4" name="date4">
                <DatePicker
                  placeholder="-select date-"
                  className={styles.datePicker}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Input 6" name="input6">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="option8"
                label="Option 8"
                rules={[{ required: true, message: 'Option 8 là bắt buộc!' }]}
              >
                <Select placeholder="-select-">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                label="Input 7"
                name="input7"
                rules={[{ required: true, message: 'Input 7 là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Date 5" name="date5">
                <DatePicker
                  placeholder="-select date-"
                  className={styles.datePicker}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="switch2" label="Switch 2">
                <Switch checkedChildren="O" unCheckedChildren="X" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="option9"
                label="Option 9"
                rules={[{ required: true, message: 'Option 9 là bắt buộc!' }]}
              >
                <Select placeholder="-select-">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                label="Input 8"
                name="input8"
                rules={[{ required: true, message: 'Input 8 là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Date 6" name="date6">
                <DatePicker
                  placeholder="-select date-"
                  className={styles.datePicker}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="option10"
                label="Option 10"
                rules={[{ required: true, message: 'Option 10 là bắt buộc!' }]}
              >
                <Select placeholder="-select-">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Input 9" name="input9">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item label="Input 10" name="input10">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Input 11" name="input11">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="" name="input11">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Input 12"
                name="input12"
                rules={[{ required: true, message: 'Input 12 là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div> */}
      </Form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  restaurant: selectorRestaurant,
  category: selectorCategory,
  breakfast: selectorBreakfast,
  lunch: selectorLunch,
  desert: selectorDesert,
  reservation: selectorReservation,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategory: (id: string) => dispatch(fetchCategoryAction(id)),
    fetchRestaurant: () => dispatch(fetchRestaurantAction()),
    fetchBreakfast: (category: string) =>
      dispatch(fetchBreakfastAction(category)),
    fetchLunch: (category: string) => dispatch(fetchLunchAction(category)),
    fetchDesert: (category: string) => dispatch(fetchDesertAction(category)),
    fetchReservation: (id: string) => dispatch(fetchReservationAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
