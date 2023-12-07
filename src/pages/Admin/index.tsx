import { ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import styles from './style.admin.scss';
import { connect } from '@umijs/max';
import { createStructuredSelector } from 'reselect';
import { fetchBreakfastAction, fetchCategoryAction, fetchDesertAction, fetchLunchAction, fetchRestaurantAction } from './store/actions'
import { selectorBreakfast, selectorCategory, selectorDesert, selectorLunch, selectorRestaurant } from './store/selectors'
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';

const Menu = (props) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [active, setActive] = useState<boolean>(true);
  const restaurant = Form.useWatch('restaurant', form);
  const category = Form.useWatch('category', form);

  useEffect(() => {
    props.fetchRestaurant();
  }, []);

  useUpdateEffect(() => {
    props.fetchCategory(restaurant);
    form.setFieldValue('category', undefined);
  }, [restaurant])

  useUpdateEffect(() => {
    props.fetchBreakfast(category);
    form.setFieldValue('breakfast', undefined);
    props.fetchLunch(category);
    form.setFieldValue('lunch', undefined);
    props.fetchDesert(category);
    form.setFieldValue('desert', undefined);
  }, [category])

  const handleSwitchChange = (values) => {
    form.setFieldValue('restaurant', undefined);
    setActive(values);
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Title level={2} className={styles.title}>
          Page admin
        </Title>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className={styles.buttonWrapper}>
          <Button icon={<ReloadOutlined />}>Xoá Màn Hình (ALT + R)</Button>
          <Button
            type="primary"
            className={styles.saveButton}
            icon={<SaveOutlined />}
            htmlType='submit'
          >
            Lưu (ALT + S)
          </Button>
        </div>
        <div className={styles.sectionTitle}>
          <Title level={5}>Thông Tin 1</Title>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="restaurant"
                label="Restaurant"
                rules={[{ required: active, message: 'Restaurant is required!' }]}
              >
                <Select placeholder="-select-" options={props.restaurant} disabled={!active}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="Date 1"
                name="date1"
                rules={[{ required: active, message: 'Date 1 là bắt buộc!' }]}
              >
                <DatePicker
                  placeholder="Chọn thời điểm"
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
                <Select placeholder="-select-" options={props.category} disabled={!restaurant}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="breakfast"
                label="Breakfast"
                rules={[{ required: active, message: 'Breakfast is required!' }]}
              >
                <Select placeholder="-select-" options={props.breakfast} disabled={!category}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="lunch"
                label="Lunch"
                rules={[{ required: active, message: 'Lunch is required!' }]}
              >
                <Select placeholder="-select-" options={props.lunch} disabled={!category}/>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="desert"
                label="Desert"
                rules={[{ required: active, message: 'Desert is required!' }]}
              >
                <Select placeholder="-select-" options={props.desert} disabled={!category}/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="active" label="Active">
                <Switch checkedChildren="O" unCheckedChildren="X" onChange={handleSwitchChange} defaultChecked/>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.sectionTitle}>
          <Title level={5}>Thông Tin 2</Title>
        </div>
        <div className={styles.rowWrapper}>
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                name="input1"
                label="Input 1"
                rules={[{ required: true, message: 'Input 1 là bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="input2" label="Input 2">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="input3" label="Input 3">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Form.Item label="Date 3" name="date3">
                <DatePicker
                  placeholder=""
                  className={styles.datePicker}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                name="option6"
                label="Option 6"
                rules={[{ required: true, message: 'Option 6 là bắt buộc!' }]}
              >
                <Select placeholder="-select-">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="input4" label="Input 4">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.rowWrapper}>
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
                  placeholder="Chọn thời điểm"
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
                  placeholder="Chọn thời điểm"
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
                  placeholder="Chọn thời điểm"
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
              <Form.Item label='' name="input11">
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
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  restaurant: selectorRestaurant,
  category: selectorCategory,
  breakfast: selectorBreakfast,
  lunch: selectorLunch,
  desert: selectorDesert,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: (id) => dispatch(fetchCategoryAction(id)),
    fetchRestaurant: () => dispatch(fetchRestaurantAction()),
    fetchBreakfast: (category) => dispatch(fetchBreakfastAction(category)),
    fetchLunch: (category) => dispatch(fetchLunchAction(category)),
    fetchDesert: (category) => dispatch(fetchDesertAction(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
