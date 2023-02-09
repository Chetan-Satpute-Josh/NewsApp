import React from 'react';
import {Provider} from 'react-redux';

import MainApp from './src';
import reduxStore from './src/redux/store';

const App = () => {
  return (
    <Provider store={reduxStore}>
      <MainApp />
    </Provider>
  );
};

export default App;
