const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const channelsScene = new BaseScene('admin:channels');

channelsScene.enter(async ctx => {
    const channels = await db.controllers.channels.getAll();
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        let text = `${channel.name}\nš @${channel.link}`;
        channel.link = `https://t.me/${channel.link}`;
        let keyboard = keyboards.channel(channel);
        await ctx.reply(text, keyboard);
    }
    let text = "š Jami: " + (channels?.length) || 0;
    let keyboard = keyboards.channels();
    ctx.reply(text, keyboard);
});

channelsScene.hears("ā Kanal qo'shish", ctx => ctx.scene.enter('admin:channels:new'));
channelsScene.action(/del_(.+)/, async ctx => {
    let id = ctx.match[1];
    await db.controllers.channels.deleteById(id);
    await ctx.deleteMessage();
    ctx.answerCbQuery("ā Kanal o'chirildi!");
})

channelsScene.hears("āļø Ortga", ctx => ctx.scene.enter('admin'));

module.exports = channelsScene;