const { Scenes: { WizardScene } } = require('telegraf');
const db = require('../../database');
const { bold } = require('../../utils/format');
const keyboards = require('../../utils/keyboards');

const commonMsgScene = new WizardScene(
    'admin:commonMsg',
    (ctx) => {
        let text = "📝 Xabarni kiriting";
        let keyboard = keyboards.cancel();
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const users = await db.controllers.users.getAll();
        let success = 0;
        for (user of users) {
            try {
                await ctx.copyMessage(user.userId);
                success++
            } catch (err) { }
        }
        let text = `✅ Jami ${bold(users.length)} foydalanuvchidan ${bold(success)} nafariga xabar muvaffaqiyatli yuborildi`;
        ctx.replyWithHTML(text);
        return ctx.scene.enter('admin:statistics');
    }
);

commonMsgScene.hears('❌ Bekor qilish', ctx => ctx.scene.enter('admin:statistics'));

module.exports = commonMsgScene;