export const buttonMessageCreator = ({ messageText, buttons }) => ({
  template_type: 'button',
  text: messageText,
  buttons,
});

export const textMessageCreator = (messageText) => ({
  text: messageText,
});

export const imageMessageCreator = ({ messageText }) => ({
  type: 'image',
  text: messageText,
});
