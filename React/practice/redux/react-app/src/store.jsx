
import {createStore} from 'redux'
import ReducerFn from './Reducer'


export const store = createStore(ReducerFn)

console.log(store)








