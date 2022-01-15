const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminNewCartoonScene = new WizardScene(
    'admin:cartoons:id:new',
    (ctx) => {
        ctx.wizard.state.series = ctx.scene.state.seriesId;
        let text = "✍️ Yangi multfilm uchun nom kiriting";
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
        let text = "📁 Multfilmni video ko'rinishda yuklang.";
        ctx.reply(text);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let video = ctx.message?.video;
        if (!video) {
            let text = "❗️ Video ko'rinishda yuboring!";
            return ctx.reply(text);
        }
        ctx.wizard.state.fileId = video.file_id;
        await db.controllers.movies.create(ctx.wizard.state);
        let text = "✅ Video yuklandi.";
        ctx.reply(text);
        return ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId });
    }
);

adminNewCartoonScene.hears("❌ Bekor qilish", ctx => ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId }));

module.exports = adminNewCartoonScene;
