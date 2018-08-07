export const setStocks = (stocks) => {
    return {
      type:'SET_STOCKS',
      payload: stocks
    }
  };

export const removeStocks = (stocks) => {
    return {
      type:'REMOVE_STOCKS',
      payload: stocks
    }
  };

export const countStocks = (counter) => ({
  type: 'COUNT_STOCKS',
  counter
});