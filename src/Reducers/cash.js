export default function cash(state=initialState, action){
    switch (action.type) {
        case 'SET_INITIAL_BUDGET':
        return state = {cash: action.budget, initial: action.budget};
        case 'OPEN_POSITION':
        return Object.assign({}, state, {
            cash: state.cash - action.openParams.deposit
          })
        case 'CLOSE_POSITION':
        return Object.assign({}, state, {
            cash: state.cash + action.closeParams.profit + action.closeParams.deposit
          })
        case 'RESET':
        return Object.assign({}, state, {
          cash: state.initial, initial: state.initial
        })
        default:
          return state
      }
    }

const initialState = { cash: 10000, initial: 10000};