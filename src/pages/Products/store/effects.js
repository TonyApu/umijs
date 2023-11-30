import { getMenu, deleteItem } from '../../../services/product';

export const productEffects = {
  *fetch(_, { call, put }) {
    const { data } = yield call(getMenu);
    yield put({
      type: 'save',
      payload: data,
    });
  },
  *deleteItem({ payload }, { call, put }) {
    const { data } = yield call(deleteItem(payload));
    yield put({
      type: 'save',
      payload: data,
    });
  },
};
