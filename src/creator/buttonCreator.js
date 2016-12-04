const getShortText = text => (
  text.length > 20 ? `${text.substring(0, 16)}...` : text
);

export const buttonCreator = action => ({
  type: 'postback',
  title: getShortText(action.displayText),
  payload: action.payload,
});
