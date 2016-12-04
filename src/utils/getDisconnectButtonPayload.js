import { buttonCreator, buttonMessageCreator } from '../creator/';

export const getDisconnectButtonPayload = (partner) => {
  const actions = [
    {
      displayText: '確定',
      payload: `confirm_disconnect_${partner.messengerId}`,
    },
    {
      displayText: '取消',
      payload: 'cancel_disconnect',
    },
  ];
  const messageText = `確定要結束和 ${partner.name} 結束配對嗎？`;

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
