import * as types from '../types';

const initialState = {
  buttonClicked: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case types.BUTTON_CLICKED_SUCCESS: {
      console.log('Successful request.')
      const newState = { ...state };
      newState.buttonClicked = !newState.buttonClicked;
      return newState;
    }
    case types.BUTTON_CLICKED_FAILURE: {
      console.log('Failed request.');
      return state;
    }
    case types.BUTTON_CLICKED_REQUEST: {
      console.log('Request in progress...');
      return state;
    }

    default: {
      return state;
    }
  }
}
