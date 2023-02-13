import {configureStore} from '@reduxjs/toolkit';

import {News, newsReducer} from './news/newsSlice';
import {Status, statusReducer} from './status/statusSlice';

export interface ReduxStore {
  status: Status;
  news: News;
}

const reduxStore = configureStore<ReduxStore>({
  reducer: {
    status: statusReducer,
    news: newsReducer,
  },
});

export default reduxStore;
