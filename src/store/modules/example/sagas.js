import { call, put, all, takeLatest, take } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';

const request = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });
}

function* exampleRequest() {
  try {
    yield call(request);
    toast.success('Successful request.', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(actions.buttonClickedSuccess());
  } catch {
    // eslint-disable-next-line
    toast.error('Failed request.', {
      position: toast.POSITION.TOP_RIGHT
    });
    yield put(actions.buttonClickedFailure());
  }
}

export default all([
  takeLatest(types.BUTTON_CLICKED_REQUEST, exampleRequest)
]);
