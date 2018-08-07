import { compose, createStore, combineReducers } from 'redux';
import positionsReducer from '../Reducers/positions';
import quotesReducer from '../Reducers/quotes';
import clickQuote from '../Reducers/clickQuote';
import cash from '../Reducers/cash';
import quantity from '../Reducers/quantity';
import stocksAvailable from '../Reducers/stocksAvailable';
import stocksCounter from '../Reducers/stocksCounter';

export default () => {
  const store = createStore(
    combineReducers({
        positions: positionsReducer,
        quotes: quotesReducer,
        clickQuote: clickQuote,
        cash: cash,
        quantity: quantity,
        stocksAvailable: stocksAvailable,
        stocksCounter: stocksCounter
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
