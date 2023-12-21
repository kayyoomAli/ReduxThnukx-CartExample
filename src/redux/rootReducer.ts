// // reducers/index.js
// import {combineReducers} from 'redux';

// const rootReducer = combineReducers({
//   productsReducer,
//   // Add more reducers if needed
// });

// export default rootReducer;
// reducers/rootReducer.ts
import {combineReducers} from 'redux';
import productsReducer from './productReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  // Add more reducers if needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
