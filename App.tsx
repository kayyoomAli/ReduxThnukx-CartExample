// App.js
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {fetchProducts} from './src/redux/productAction';
import AppNavigator from './src/routes/AppNavigator';
// import ProductsList from './src/components/ProductList';

const App = () => {
  useEffect(() => {
    store.dispatch(fetchProducts());
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
