export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STOCKS':
        return [
          ...state,
          action.payload
        ];
      case 'REMOVE_STOCKS':
        return state.filter((stock) => stock !== action.payload.stock);
      default:
        return state
    }
  };

const initialState = ['FB','SNAP','AAPL','AMD','BAC'];

