import uuid from 'uuid';

// OPEN_POSITION
export const openPosition = (
  {
    symbol = '',
    indicator = 'long',
    volume = 0,
    openPrice = 0,
    openTime = 0,
    deposit = 0,
  } = {}
) => ({
  type: 'OPEN_POSITION',
  openParams: {
    id: uuid(),
    status: 'open',
    symbol,
    indicator,
    volume,
    openPrice,
    openTime,
    deposit
  }
});

// CLOSE_POSITION
export const closePosition = ({ 
  id,
  status,
  closePrice = 0,
  closeTime = 0,
  deposit,
  commission = 0,
  profit = 0
 } = {}) => ({
  type: 'CLOSE_POSITION',
  id,
  closeParams: {
  status,
  closePrice,
  closeTime,
  deposit,
  commission,
  profit
}
});

//RESET
export const reset = () => ({
  type: 'RESET'
});