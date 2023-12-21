// // store/index.js
// import {applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';
// import {legacy_createStore as createStore} from 'redux';
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import reducers from '../redux/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};
