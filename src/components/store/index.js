import { createSlice, configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory, History } from "history";
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

const passengerSlice = createSlice({
  name: 'passenger',
  initialState: {
    // initial state  
    apiParams: {
        pageSize: 10,
        page: 1,
        sortModel: null,
        filterModel: null
    }
  },
  reducers: {
    setApiParams: (state, params) => { 
      state.apiParams = params.payload;
    }
  }
})

export const { setApiParams } = passengerSlice.actions;

const rootReducer = (history: History<any>) => ({
    passenger: passengerSlice.reducer,
    router: connectRouter(history)
  });

const store = configureStore({
    reducer: rootReducer(history),
});

export default store;