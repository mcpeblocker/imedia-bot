const { Scenes: { BaseScene } } = require('telegraf');
const { bold } = require('../utils/format');
const keyboards = require('../utils/keyboards');

const startScene = new BaseScene('start');

startScene.enter((ctx) => {
    let text = `Assalomu alaykum, ${bold(ctx.from.first_name)}.\nBotimiz siz uchun foydali bo'ladi degan umiddamiz 😊`;
    let keyboard = keyboards.start();
    ctx.replyWithHTML(text, keyboard);
});

startScene.hears("🎬 Filmlar", ctx => ctx.scene.enter('movies'));
startScene.hears("🚦 Multfilmlar", ctx => ctx.scene.enter('cartoons'));
startScene.hears("🎧 Nashidlar", ctx => ctx.scene.enter('nasheeds'));
startScene.hears("📖 Qur'on", ctx => ctx.scene.enter('surahs'));
startScene.hears("💬 Izoh qoldirish", ctx => ctx.scene.enter('comment'));

module.exports = startScene;