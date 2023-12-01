import ProductList from '@/components/ProductList';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectorProducts } from './store/selectors';
import { fetchProductAction, deleteProductAction } from './store/action'

const Products = (props) => {
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    props.fetchItem();
  }, [flag]);

  const reloadState = () => {
    setFlag(!flag)
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList dispatch={props.dispatch} products={props.products} reloadState={reloadState} deleteItem={props.deleteItem}/>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectorProducts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: () => dispatch(fetchProductAction()),
    deleteItem: (id) => dispatch(deleteProductAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
