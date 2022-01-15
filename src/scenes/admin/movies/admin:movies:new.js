const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const newMoviesScene = new WizardScene(
    'admin:movies:new',
    (ctx) => {
        ctx.wizard.state.type = "movie"
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
        let text = "✅ Film qo'shildi!";
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:movies');
    }
);

newMoviesScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:movies'));

module.exports = newMoviesScene;