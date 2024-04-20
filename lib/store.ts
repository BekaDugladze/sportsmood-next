import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {rootReducer, initialState} from './slicer/reducer'
import { adminButReducer, adminInitialState } from './slicer/but';

  
  export const makeStore = () => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: initialState
    });
  };

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']