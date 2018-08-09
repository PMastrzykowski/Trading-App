export default (state = [], action) => {
  switch (action.type) {
    case 'OPEN_POSITION':
      return [
        ...state,
        action.openParams
      ];
    case 'CLOSE_POSITION':
      return state.map((openParams) => {
        if (openParams.id === action.id) {
          return {
            ...openParams,
            ...action.closeParams
          };
        }
        return openParams;
      });
    case 'RESET':
      return state = [];
    default:
      return state;
  }
};