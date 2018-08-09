export default (state = initialState, action) => {
    switch (action.type) {
      case 'MOUSE_IN':
      let text;
      switch(action.name){
        case 'transaction':
          text = 'You don\'t have enough money to finalize this transaction.';
          break;
        case 'removeStock':
          text = 'To remove these stocks, reset the game.';
          break;
        default:
          text = '';
          break;
      }
        return {name: action.name, text: text, mouseX: action.mouseX, mouseY: action.mouseY};
      case 'MOUSE_MOVE':
        return {...state, mouseX: action.mouseX, mouseY: action.mouseY};
      case 'MOUSE_OUT':
          return {name: null};
      default:
        return {name: null};
    }
};

const initialState ={
    name: null
  }