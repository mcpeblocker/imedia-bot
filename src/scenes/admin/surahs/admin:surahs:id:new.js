const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminNewNasheed = new WizardScene(
    'admin:surahs:id:new',
    (ctx) => {
        ctx.wizard.state.author = ctx.scene.state.authorId;
        let text = "✍️ Yangi sura uchun nom kiriting";
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
        let text = "1️⃣ Oyatlar sonini kiriting";
        ctx.reply(text);
        return ctx.wizard.next();
    },
    (ctx) => {
        let count = ctx.message?.text;
        if (!count) {
            return ctx.reply("❗️ Iltimos, to'g'ri ma'lumot kiriting");
        }
        ctx.wizard.state.count = count;
        let text = "🌎 Nozil bo'lgan joyni kiriting";
        ctx.reply(text);
        return ctx.wizard.next();
    },
    (ctx) => {
        let place = ctx.message?.text;
        if (!place) {
            return ctx.reply("❗️ Iltimos, to'g'ri ma'lumot kiriting");
        }
        ctx.wizard.state.place = place;
        let text = "📁 Surani musiqa fayl ko'rinishda yuklang.";
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
        await db.controllers.surahs.create(ctx.wizard.state);
        let text = "✅ Sura yuklandi.";
        ctx.reply(text);
        return ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId });
    }
);

adminNewNasheed.hears("❌ Bekor qilish", ctx => ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId }));

module.exports = adminNewNasheed;
