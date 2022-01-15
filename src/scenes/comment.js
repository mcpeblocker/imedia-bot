const { Scenes: { WizardScene } } = require('telegraf');
const config = require('../utils/config');
const keyboards = require('../utils/keyboards');
const { link } = require('../utils/format');

const commentScene = new WizardScene(
    'comment',
    ctx => {
        let text = "📝 Sizning fikringiz biz uchun muhim! Bemalol yuborishingiz mumkin 👇";
        let keyboard = keyboards.back();
        ctx.reply(text, keyboard);
        return ctx.wizard.next();
    },
    ctx => {
        let text = link("💬 Foydalanuvchi", `tg://user?id=${ctx.from.id}`) + " fikri";
        for (admin of config.ADMINS) {
            ctx.telegram.sendMessage(admin, text, { parse_mode: 'HTML' });
            ctx.forwardMessage(admin);
        };
        text = "✅ Fikringiz uchun rahmat! Biz buni albatta inobatga olamiz 😊";
        ctx.reply(text);
    }
);

commentScene.hears("◀️ Ortga", ctx => ctx.scene.enter('start'));

module.exports = commentScene;