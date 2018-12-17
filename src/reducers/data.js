import { combineReducers } from 'redux'
import {
  DATA_HAS_ERRORED,
  DATA_IS_LOADING,
  DATA_FETCH_DATA_SUCCESS
} from '../actions/data'

export function dataHasErrored(state = false, { type, hasErrored }) {
  switch (type) {
    case DATA_HAS_ERRORED:
      return hasErrored

    default:
      return state
  }
}

export function dataIsLoading(state = false, { type, isLoading }) {
  switch (type) {
    case DATA_IS_LOADING:
      return isLoading

    default:
      return state
  }
}

export function data(state = [], { type, serries, meta }) {
  switch (type) {
    case DATA_FETCH_DATA_SUCCESS:
      return { ...state, serries, meta }

    default:
      return state
  }
}
export default {
  data,
  dataHasErrored,
  dataIsLoading
}
