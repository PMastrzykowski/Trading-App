export default (state = initialState, action) => {
    switch (action.type) {
      case 'QUANTITY':
        return {quantity: action.quantity};
      case 'OPEN_POSITION':
        return {quantity: 1};
      case 'CLICK_QUOTE':
        return {quantity: 1};
      default:
        return state;
    }
};
const initialState = {
    quantity: 1
}