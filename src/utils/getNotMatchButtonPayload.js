import { buttonCreator, buttonMessageCreator } from '../creator/';

const actions = [
  {
    displayText: '使用說明',
    payload: '使用說明',
  },
];
const messageText = '看起來你還沒有配對成功，請點選按鈕。';

const buttons = actions.map(buttonCreator);
const payload = buttonMessageCreator({
  messageText,
  buttons,
});

export const getNotMatchButtonPayload = () => ({
  attachment: {
    type: 'template',
    payload,
  },
});
