import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('You are now logged in.', {
      position: toast.POSITION.TOP_RIGHT
    });

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (err) {
    toast.error('User or password is invalid.', {
      position: toast.POSITION.TOP_RIGHT
    });

    yield put(actions.loginFailure);
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest)
]);
