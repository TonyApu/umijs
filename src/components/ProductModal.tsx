import { dateFormat } from '../constants';
import { useUpdateEffect } from 'ahooks';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

export class Product {
  id: string;
  name: string;
  price: number;
  withSauce: boolean;
  quantity: number;
  expiredDate: Date;
  description?: string;
  src: string;

  constructor(
    id: string,
    name: string,
    price: number,
    withSauce: boolean,
    quantity: number,
    expiredDate: Date,
    description: string,
    src: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.withSauce = withSauce;
    this.quantity = quantity;
    this.expiredDate = expiredDate;
    this.description = description;
    this.src = src;
  }
}

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const ProductModal: React.FC<{
  products: Product;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  reloadState: () => void;
  deleteItem: (id) => void;
}> = ({
  products,
  handleOk,
  isModalOpen,
  handleCancel,
  reloadState,
  deleteItem
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [withSauce, setWithSauce] = useState(false);

  useUpdateEffect(() => {
    form.setFieldsValue({
      ...products,
      expiredDate: moment(products.expiredDate, dateFormat),
    });
    setWithSauce(products.withSauce);
  }, [products]);

  const handleDeleteMenu = () => {
    deleteItem(products.id);
    reloadState();
    handleOk();
  };

  return (
    <Modal
      title={products.name}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={() => console.log('ok')}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Giá"
                name="price"
                rules={[{ required: true, message: 'Thông tin bắt buộc!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Kèm nước sốt" name="withSauce">
                <Checkbox checked={withSauce} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: 'Thông tin bắt buộc!' },
                  {
                    validator: (
                      rule: any,
                      value: number,
                      cb: (msg?: string) => void,
                    ) => {
                      value > 30 ? cb('Số lượng tối đa không quá 30.') : cb();
                    },
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="HSD"
                name="expiredDate"
                rules={[
                  { required: true, message: 'Thông tin bắt buộc!' },
                  {
                    validator: (
                      rule: any,
                      value: Date,
                      cb: (msg?: string) => void,
                    ) => {
                      value < new Date()
                        ? cb('Ngày hết hạn phải lớn hơn hôm nay.')
                        : cb();
                    },
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  style={{ display: 'inherit' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[
              {
                type: 'string',
                max: 999,
                message: 'Bạn chỉ được nhập tối đa 999 kí tự',
              },
            ]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <img
            src={products?.src}
            style={{ width: '-webkit-fill-available', height: '200px' }}
          />
          <Space>
            <Button key="back" onClick={handleCancel}>
              Trở Về
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Cập Nhật Thông Tin
            </Button>
            <Button
              key="delete"
              type="primary"
              danger
              onClick={handleDeleteMenu}
            >
              Xoá Khỏi Menu
            </Button>
          </Space>
        </Form>
      </>
    </Modal>
  );
};

export default ProductModal;
