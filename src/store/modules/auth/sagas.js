import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

function* loginRequest({ payload }) {
  // eslint-disable-next-line
  yield console.log('Saga', payload);
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest)
]);
