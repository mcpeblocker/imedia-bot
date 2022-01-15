const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminNewNasheed = new WizardScene(
    'admin:nasheeds:id:new',
    (ctx) => {
        ctx.wizard.state.author = ctx.scene.state.authorId;
        let text = "✍️ Yangi nashida uchun nom kiriting";
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
        let text = "📁 Nashidani musiqa fayl ko'rinishda yuklang.";
        ctx.reply(text);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let audio = ctx.message?.audio;
        if (!audio) {
            let text = "❗️ Musiqa fayl ko'rinishda yuboring!";
            return ctx.reply(text);
        }
        ctx.wizard.state.fileId = audio.file_id;
        const nasheed = await db.controllers.nasheeds.create(ctx.wizard.state);
        let text = "✅ Nashida yuklandi.";
        ctx.reply(text);
        return ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId });
    }
);

adminNewNasheed.hears("❌ Bekor qilish", ctx => ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId }));

module.exports = adminNewNasheed;
