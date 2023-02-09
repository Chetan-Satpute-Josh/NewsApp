import {configureStore} from '@reduxjs/toolkit';

interface ReduxStore {}

const reduxStore = configureStore<ReduxStore>({
  reducer: () => {},
});

export default reduxStore;
