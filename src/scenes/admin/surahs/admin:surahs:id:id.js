const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminSurahScene = new BaseScene('admin:surahs:id:id');

adminSurahScene.enter(async ctx => {
    const id = ctx.scene.state.surahId;
    if (!id) {
        return ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId });
    }
    const surah = await db.controllers.surahs.getById(id);
    if (!surah) {
        return ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId });    }
    let caption = "🎵 " + surah.name;
    let keyboard = keyboards.surah(surah);
    ctx.replyWithAudio(surah.fileId, { caption, ...keyboard });
});

adminSurahScene.hears("❌ Su'rani o'chirish", async (ctx) => {
    await db.controllers.surahs.deleteById(ctx.scene.state.surahId);
    ctx.reply("✅ Nashida o'chirildi!");
    ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId });
});

adminSurahScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:surahs:id', { id: ctx.scene.state.authorId }));

module.exports = adminSurahScene;