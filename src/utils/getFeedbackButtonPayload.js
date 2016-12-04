import { buttonCreator, buttonMessageCreator } from '../creator/';

export const getFeedbackButtonPayload = (url) => {
  const actions = [
    {
      displayText: '有',
      payload: `feedback_positive_${url}`,
    },
    {
      displayText: '沒有',
      payload: `feedback_negative_${url}`,
    },
  ];
  const messageText = '看完文章心情好點了嗎？';

  const buttons = actions.map(buttonCreator);
  const payload = buttonMessageCreator({
    messageText,
    buttons,
  });
  return {
    attachment: {
      type: 'template',
      payload,
    },
  };
};
