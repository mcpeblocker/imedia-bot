const { Scenes: { BaseScene } } = require("telegraf");
const isAdmin = require("../../middlewares/isAdmin");
const keyboards = require('../../utils/keyboards');

const adminScene = new BaseScene('admin');

adminScene.use(isAdmin);

adminScene.enter(ctx => {
    let text = "👑 Admin paneli";
    let keyboard = keyboards.admin();
    ctx.reply(text, keyboard);
});

adminScene.hears("🎥 Filmlar", ctx => ctx.scene.enter('admin:movies'));
adminScene.hears("👼 Multfilmlar", ctx => ctx.scene.enter('admin:cartoons'));
adminScene.hears("🎶 Nashidlar", ctx => ctx.scene.enter('admin:nasheeds'));
adminScene.hears("📗 Qur'on", ctx => ctx.scene.enter('admin:surahs'));
adminScene.hears("📡 Kanallar", ctx => ctx.scene.enter('admin:channels'));
adminScene.hears("📊 Statistika", ctx => ctx.scene.enter('admin:statistics'));

adminScene.hears("◀️ Paneldan chiqish", ctx => ctx.scene.enter('start'));

module.exports = adminScene;