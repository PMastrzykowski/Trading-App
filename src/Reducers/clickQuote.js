export default (state = initialState, action) => {
    switch (action.type) {
      case 'REMOVE_STOCKS':
        return {isVisible: false};
      case 'CLICK_QUOTE':
        return {...action.payload, isVisible: true};
      case 'CLICK_QUOTE_CLOSE':
          return {isVisible: false};
      default:
        return state;
    }
};

const initialState ={
    isVisible: false
  }