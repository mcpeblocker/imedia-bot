const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const newMoviesScene = new WizardScene(
    'admin:cartoons:new',
    (ctx) => {
        ctx.wizard.state.type = "cartoon"
        let text = "✍️ Yangi film uchun nom kiriting";
        let keyboard = keyboards.cancel();
        ctx.reply(text, keyboard);
        return ctx.wizard.next();
    },
    async (ctx) => {
        let name = ctx.message?.text;
        if (!name) {
            return ctx.scene.reenter();
        }
        ctx.wizard.state.name = name;
        await db.controllers.series.create(ctx.wizard.state);
        let text = "✅ Multfilm qo'shildi!";
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:cartoons');
    }
);

newMoviesScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:cartoons'));

module.exports = newMoviesScene;