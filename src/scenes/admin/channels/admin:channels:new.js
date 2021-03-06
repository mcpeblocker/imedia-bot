const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const newChannelScene = new WizardScene(
    'admin:channels:new',
    (ctx) => {
        let text = "āļø Yangi kanal uchun nom kiriting";
        let keyboard = keyboards.cancel();
        ctx.reply(text, keyboard);
        return ctx.wizard.next();
    },
    (ctx) => {
        let name = ctx.message?.text;
        if (!name) {
            return ctx.scene.reenter();
        }
        ctx.wizard.state.name = name;
        let text = "š Kanal havolasini yuboring\n\n<i>Misol: @alisherortiqov</i>";
        ctx.replyWithHTML(text);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let link = ctx.message?.text;
        if (!link) {
            let text = "āļø Iltimos, havolani kiriting";
            ctx.reply(text);
        }
        ctx.wizard.state.link = link.split("@")[1];
        const channel = await db.controllers.channels.create(ctx.wizard.state);
        let text = `ā Kanal qo'shildi!\n\nš @${channel.link}`;
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:channels');
    }
);

newChannelScene.hears('ā Bekor qilish', ctx => ctx.scene.enter('admin:channels'));

module.exports = newChannelScene;