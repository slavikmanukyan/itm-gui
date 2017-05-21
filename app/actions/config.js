export const SELECT_FILE = 'CONFIG/SELECT_FILE';
export const GET_CONFIG = 'CONFIG/GET_CONFIG';
export const RESET = 'CONFIG/RESET';

export function fileSelected(file) {
  return {
    type: SELECT_FILE,
    file,
  };
}

export function getConfig(data) {
  return {
    type: GET_CONFIG,
    data,
  };
}

export function reset() {
    return {
        type: RESET
    }
}