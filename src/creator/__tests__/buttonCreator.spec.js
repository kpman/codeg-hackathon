// https://developers.facebook.com/docs/messenger-platform/send-api-reference/postback-button
import {
  buttonCreator,
} from '../buttonCreator';

it('#buttonCreator should be defined ', () => {
  expect(buttonCreator).toBeDefined();
});
it('button type must be `postback`', () => {
  const action = {
    displayText: 'cph!!!',
  };
  const button = buttonCreator(action);
  expect(button.type).toBe('postback');
});

it('button title must less than 20 words', () => {
  const action = {
    displayText: 'cph!cph!cph!cph!cph!cph!cph!cph!cph!cph!cph!cph!cph!cph!',
  };
  const button = buttonCreator(action);
  expect(button.title.length <= 20).toBe(true);
});

it('button title must less than 20 chinese words', () => {
  const action = {
    displayText: 'AI 是指電腦透過模擬人類大腦在記憶、辨識、預測等方面的工作流程，而展現出的智慧。',
  };
  const button = buttonCreator(action);
  expect(button.title.length <= 20).toBe(true);
});
