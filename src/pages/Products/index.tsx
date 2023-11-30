import ProductList from '@/components/ProductList';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectorProducts } from './store/selectors';
import { PRODUCT_SPACE } from './store/constants';

const Products = (props) => {
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    props.dispatch({
      type: `${PRODUCT_SPACE}/fetch`,
    });
  }, [flag]);

  const reloadState = () => {
    setFlag(!flag)
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList dispatch={props.dispatch} products={props.products} reloadState={reloadState}/>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectorProducts,
});

export default connect(mapStateToProps)(Products);
