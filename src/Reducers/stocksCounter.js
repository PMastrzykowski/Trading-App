export default (state = initialState, action) => {
    switch (action.type) {
        case 'COUNT_STOCKS':
            return {counter: state.counter + action.counter}
        case 'REMOVE_STOCKS':
            return {counter: state.counter - 1}
        default:
            return state
    }
  };

const initialState = {counter: 5};


