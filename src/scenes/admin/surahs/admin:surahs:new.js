const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const newAuthorScene = new WizardScene(
    'admin:surahs:new',
    (ctx) => {
        ctx.wizard.state.type = "surah";
        let text = "✍️ Yangi avtor uchun nom kiriting";
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
        await db.controllers.authors.create(ctx.wizard.state);
        let text = "✅ Avtor qo'shildi!";
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:surahs');
    }
);

newAuthorScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:surahs'));

module.exports = newAuthorScene;