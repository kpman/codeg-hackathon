import { buttonCreator, buttonMessageCreator } from '../creator/';

export const getMatchButtonPayload = ({ code }) => {
  const username = code.username;
  const messageText = `你輸入了配對碼 ${code.code}\n確定要和 ${username} 配對嗎？`;
  const actions = [
    {
      displayText: '確定配對',
      payload: `connected_with_code_${code.code}`,
    },
  ];
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
