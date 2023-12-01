import { Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import ProductModal, { Product } from './ProductModal';

const ProductList: React.FC<{
  products: Product;
  handleOk: () => void;
  handleCancel: () => void;
  reloadState: () => void;
  deleteItem: (id) => void;
}> = ({products, reloadState, deleteItem }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    withSauce: false,
    quantity: 0,
    expiredDate: new Date(),
    src: '',
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Tên món',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'HSD',
      dataIndex: 'expiredDate',
      render(text, record) {
        return <div>{moment(text).format('DD/MM/YYYY')}</div>;
      },
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        dataSource={products}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            setProduct(record);
            setIsModalOpen(true);
          },
        })}
      />
      <ProductModal
        products={product}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        reloadState={reloadState}
        deleteItem={deleteItem}
      />
    </>
  );
};

export default ProductList;
