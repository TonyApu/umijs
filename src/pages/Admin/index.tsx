import { dateFormat } from '@/constants';
import {
  CheckOutlined,
  LoadingOutlined,
  ReloadOutlined,
  SaveOutlined,
} from '@ant-design/icons';
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

import { submitForm } from '@/services/menu';
import {
  fetchBreakfastAction,
  fetchCategoryAction,
  fetchDesertAction,
  fetchLunchAction,
  fetchReservationAction,
  fetchRestaurantAction,
  submitFormAction,
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
  const debouncedValue = useDebounce(code, { wait: 500 });
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
    if (id) {
      let code = id;
      while (code.length < 8) {
        code = '0' + code;
      }
      form.setFieldValue('code', code);
      props.fetchReservation(code, (data: any) => {
        if (data) {
          setIsChecked(true);
          form.setFieldsValue({
            ...data,
            date: moment(data.date, dateFormat),
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
    setLoading(true);
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
          <Button icon={<ReloadOutlined />} onClick={handleDelete}>
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
                  suffix={
                    loading ? (
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ fontSize: 16 }} spin />
                        }
                      />
                    ) : (
                      isChecked && (
                        <CheckOutlined
                          style={{ color: 'green', fontSize: 16 }}
                        />
                      )
                    )
                  }
                  disabled={loading}
                />
              </Form.Item>
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategory: (id: string) => dispatch(fetchCategoryAction(id)),
    fetchRestaurant: () => dispatch(fetchRestaurantAction()),
    fetchBreakfast: (category: string) =>
      dispatch(fetchBreakfastAction(category)),
    fetchLunch: (category: string) => dispatch(fetchLunchAction(category)),
    fetchDesert: (category: string) => dispatch(fetchDesertAction(category)),
    fetchReservation: (id: string, resolve: any) =>
      dispatch(fetchReservationAction(id, resolve)),
    submitForm: (values: any) => dispatch(submitFormAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
