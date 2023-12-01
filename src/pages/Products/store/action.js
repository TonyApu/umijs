import { PRODUCT_SPACE, FETCH_PRODUCT_ACTION, DELETE_PRODUCT_ACTION } from '../store/constants';

export const fetchProductAction = () => ({
    type: `${PRODUCT_SPACE}/${FETCH_PRODUCT_ACTION}`,
});

export const deleteProductAction = (id) => ({
    type: `${PRODUCT_SPACE}/${DELETE_PRODUCT_ACTION}`,
    payload: id,
});

