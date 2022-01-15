const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const newChannelScene = new WizardScene(
    'admin:channels:new',
    (ctx) => {
        let text = "✍️ Yangi kanal uchun nom kiriting";
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
        let text = "🔗 Kanal havolasini yuboring\n\n<i>Misol: @alisherortiqov</i>";
        ctx.replyWithHTML(text);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let link = ctx.message?.text;
        if (!link) {
            let text = "❗️ Iltimos, havolani kiriting";
            ctx.reply(text);
        }
        ctx.wizard.state.link = link.split("@")[1];
        const channel = await db.controllers.channels.create(ctx.wizard.state);
        let text = `✅ Kanal qo'shildi!\n\n🔗 @${channel.link}`;
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:channels');
    }
);

newChannelScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:channels'));

module.exports = newChannelScene;