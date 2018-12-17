import { combineReducers } from 'redux'
import data from './data'
import { connectRouter } from 'connected-react-router'

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...data
  })
