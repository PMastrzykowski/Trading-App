export default (state = [], action) => {
    switch (action.type) {
      case 'SET_QUOTE':
        return [
          ...state,
          action.quote
        ];
      case 'UPDATE_QUOTE':
        return state.map((quote) => {
          if (quote.symbol === action.symbol) {
            return {
              ...quote,
              ...action.updates
            };
          } 
          else {
            return quote;
          };
        });
      case 'REMOVE_STOCKS':
        return state.filter((quote) => quote.symbol !== action.payload.stock);
      default:
        return state;
    }
  };