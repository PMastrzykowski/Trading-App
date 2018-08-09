// SET_QUOTE
export const setQuote = (
  {
    symbol = '',
    companyName = '',
    bid = 0,
    ask = 0,
    pic = ''
  } = {}
) => ({
  type: 'SET_QUOTE',
  quote: {
    symbol,
    companyName,
    bid,
    ask,
    pic
  }
});

// UPDATE_QUOTE
export const updateQuote = (symbol, updates) => ({
    type: 'UPDATE_QUOTE',
    symbol,
    updates
  });

// CLICK_QUOTE
export const clickQuote = (quote) => {
  return {
      type: 'CLICK_QUOTE',
      payload: {quote}
  }
};

// CLICK_QUOTE_CLOSE
export const clickQuoteClose = () => {
  return {
    type:'CLICK_QUOTE_CLOSE'
  }
};

//QUANTITY
export const lots = (quantity) => {
  return {
    type:'QUANTITY',
    payload: {quantity}
  }
};