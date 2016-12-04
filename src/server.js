/* eslint-disable consistent-return */
import http from 'http';

import shortid from 'shortid';
import Bot from 'messenger-bot';
import Random from 'random-js';

import { User, Message, Code, Relation } from './models/sequelize';
import { getPartnerId } from './models/shared/';
import {
  getHelpButtonPayload,
  getMatchButtonPayload,
  getNotMatchButtonPayload,
  getFeedbackButtonPayload,
  getDisconnectButtonPayload,
  getLinkPayload,
} from './utils/';

const bot = new Bot({
  token: process.env.PAGE_TOKEN || 'PAGE_TOKEN',
  verify: process.env.VERIFY_TOKEN || 'VERIFY_TOKEN',
});

bot.on('error', (err) => {
  console.log(err.message);
});

bot.on('message', async (payload, reply) => {
  const text = payload.message.text;
  const senderId = payload.sender.id;
  let replyId = senderId;

  bot.getProfile(senderId, async (err, profile) => {
    if (err) throw err;

    await User.findOrCreate({
      where: {
        messengerId: senderId,
      },
      defaults: {
        id: shortid.generate(),
        name: `${profile.first_name} ${profile.last_name}`,
        relation: '1',
      },
    });

    if (payload.message.text === 'help') {
      const helpButtonPayload = getHelpButtonPayload();
      return bot.sendMessage(replyId, helpButtonPayload, error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name} with 使用說明`);
      });
    }

    const checkCode = Number(payload.message.text);
    if (!isNaN(checkCode) && payload.message.text.length === 6) {
      const code = await Code.findOne({
        where: {
          code: payload.message.text,
        },
      });

      if (code.userId === senderId) {
        const replayText = '你輸入了自己的配對碼，無法配對啦 :(';
        return reply(senderId, { text: replayText });
      }

      const matchButtonPayload = getMatchButtonPayload({ code });
      return bot.sendMessage(replyId, matchButtonPayload, error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name}
          with match button`);
      });
    }

    if (/想怎樣/.test(payload.message.text)) {
      const linkPayload = await getLinkPayload();
      const feedbackButtonPayload = await getFeedbackButtonPayload();

      bot.sendMessage(replyId, {
        text: '【枕邊時刻】\n親愛的，夜深了\n我們發現今天的你是否不太順心呢？\n試著來讀讀我們為你推薦的文章好嗎？',
      }, error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name} with link 推撥`);
      });
      bot.sendMessage(replyId, linkPayload, error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name} with link 推撥`);
      });
      return bot.sendMessage(replyId, feedbackButtonPayload, error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name} with 意見回饋`);
      });
    }

    const partnerId = await getPartnerId(senderId);
    if (!partnerId) {
      return bot.sendMessage(replyId, getNotMatchButtonPayload(), error => {
        if (error) throw error;
        console.log(`Echoed back to ${profile.first_name} ${profile.last_name}
          with not match button`);
      });
    }

    replyId = partnerId;

    const type = 'normal';

    Message.create({
      id: shortid.generate(),
      senderId,
      receiverId: replyId,
      content: text,
      type,
    });

    reply(replyId, { text }, error => {
      if (error) throw error;
      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`);
    });
  });
});

bot.on('postback', async (payload, reply) => {
  const senderId = payload.sender.id;
  const payloadText = payload.postback.payload;

  const sender = await User.findOne({
    where: {
      messengerId: senderId,
    },
  });

  if (payloadText === '取得配對碼') {
    // check sender is connected or not
    const partnerId = await getPartnerId(senderId);
    if (partnerId) {
      const text = '你已經有配對者了，無法再取得配對碼囉。';
      return reply(senderId, { text }, err => {
        if (err) throw err;
        console.log(`Echoed postback to ${senderId}: ${text}`);
      });
    }

    const random = new Random();
    const randomNum = random.integer(100000, 999999);

    const code = await Code.findOne({
      where: {
        userId: senderId,
      },
    }).then(resCode => {
      if (!resCode) {
        return Code.create({
          id: shortid.generate(),
          userId: senderId,
          code: randomNum,
          username: sender.name,
        });
      }
      return Code.update({
        code: randomNum,
      }, {
        where: {
          userId: senderId,
        },
      }).then(() => Code.findOne({
        where: {
          userId: senderId,
        },
      }));
    });

    const text = `你的配對碼為： ${code.code}\n請告知你欲配對的對象直接輸入此六碼數字。\n對方確認後，就會開始兩人專屬聊天室。`;
    return reply(senderId, { text }, err => {
      if (err) throw err;
      console.log(`Echoed postback to ${senderId}: ${text}`);
    });
  } else if (payloadText === 'disconnect_partner') {
    const partnerId = await getPartnerId(senderId);
    if (!partnerId) {
      const text = '你還沒有配對過喔！';
      return reply(senderId, { text }, err => {
        if (err) throw err;
        console.log(`Echoed postback to ${senderId}: ${text}`);
      });
    }
    const partner = await User.findOne({
      where: {
        messengerId: partnerId,
      },
    });
    return reply(senderId, getDisconnectButtonPayload(partner), err => {
      if (err) throw err;
      console.log(`Echoed postback to ${senderId}: 取消配對選項`);
    });
  } else if (payloadText === '使用說明') {
    return reply(senderId, getHelpButtonPayload(), err => {
      if (err) throw err;
      console.log(`Echoed postback to ${senderId}: 使用說明`);
    });
  } else if (payloadText.startsWith('confirm_disconnect')) {
    const partnerId = payloadText.replace('confirm_disconnect_', '');
    await Relation.destroy({
      where: {
        $or: [
          {
            user1: partnerId,
          },
          {
            user2: partnerId,
          },
        ],
      },
    });
    const partner = await User.findOne({
      where: {
        messengerId: partnerId,
      },
    });
    let text = `你已經和 ${partner.name} 結束斷開連結 :(`;
    reply(senderId, { text });
    text = `你已經和 ${sender.name} 結束斷開連結 :(`;
    return reply(partnerId, { text });
  } else if (payloadText.startsWith('connected_with_code')) {
    const connecteduUser = await Code.findOne({
      where: {
        code: payloadText.replace('connected_with_code_', ''),
      },
    }).then(code => User.findOne({
      where: {
        messengerId: code.userId,
      },
    }));

    await Relation.create({
      id: shortid.generate(),
      user1: senderId,
      user2: connecteduUser.messengerId,
      situation: '1',
    });

    let text = `你已經成功和 ${connecteduUser.name} 配對！\n可以開始聊天囉！`;
    reply(senderId, { text }, err => {
      if (err) throw err;
      console.log(`Echoed postback to ${senderId}: ${text}`);
    });

    text = `你已經成功和 ${sender.name} 配對！\n可以開始聊天囉！`;
    reply(connecteduUser.messengerId, { text }, err => {
      if (err) throw err;
      console.log(`Echoed postback to ${connecteduUser.messengerId}: ${text}`);
    });
  }
});

http.createServer(bot.middleware()).listen(3000);
console.log('Echo bot server running at port 3000.');
