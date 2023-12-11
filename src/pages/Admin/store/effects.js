import {
  getBreakfast,
  getCategory,
  getDesert,
  getLunch,
  getReservation,
  getRestaurant,
} from '../../../services/menu';

export const menuEffects = {
  *fetchRestaurant(_, { call, put }) {
    const { data } = yield call(getRestaurant);
    yield put({
      type: 'saveRestaurant',
      payload: data,
    });
  },
  *fetchCategory({ payload }, { call, put }) {
    const { data } = yield call(getCategory, payload);
    yield put({
      type: 'saveCategory',
      payload: data,
    });
  },
  *fetchBreakfast({ payload }, { call, put }) {
    const { data } = yield call(getBreakfast, payload);
    yield put({
      type: 'saveBreakfast',
      payload: data,
    });
  },
  *fetchLunch({ payload }, { call, put }) {
    const { data } = yield call(getLunch, payload);
    yield put({
      type: 'saveLunch',
      payload: data,
    });
  },
  *fetchDesert({ payload }, { call, put }) {
    const { data } = yield call(getDesert, payload);
    yield put({
      type: 'saveDesert',
      payload: data,
    });
  },
  *fetchReservation({ payload, resolve }, { call, put }) {
    const { data } = yield call(getReservation, payload, resolve);
    resolve(data);
    // yield put({
    //   type: 'saveReservation',
    //   payload: data,
    // });
  },
};
