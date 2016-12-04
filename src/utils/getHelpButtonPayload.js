import { buttonCreator, buttonMessageCreator } from '../creator/';

const actions = [
  {
    displayText: '取得配對碼',
    payload: '取得配對碼',
  },
];
const messageText = '【使用說明】\n1. 取得配對碼\n2. 請對方輸入進行配對確認\n3. 開始兩人專屬聊天室！';

const buttons = actions.map(buttonCreator);
const payload = buttonMessageCreator({
  messageText,
  buttons,
});

export const getHelpButtonPayload = () => ({
  attachment: {
    type: 'template',
    payload,
  },
});
