import {configureStore} from '@reduxjs/toolkit';

import {Status, statusReducer} from './status/statusSlice';

export interface ReduxStore {
  status: Status;
}

const reduxStore = configureStore<ReduxStore>({
  reducer: {
    status: statusReducer,
  },
});

export default reduxStore;
