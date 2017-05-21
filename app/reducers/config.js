// @flow
import { SELECT_FILE, GET_CONFIG, RESET } from '../actions/config';
const initialState = {
    editingFile: false,
    data: {},
    file: null,
};

export default function config(state = initialState, action) {
  switch (action.type) {
    case SELECT_FILE:
      return { ...state, editingFile: true, file: action.file };
    case GET_CONFIG:
      return { ...state, editingFile: true, data: action.data };
    case RESET: {
        return { ...initialState, editingFile: true };
    }
    default:
      return state;
  }
}
