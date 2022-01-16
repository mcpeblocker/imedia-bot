const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminSurahsScene = new BaseScene('admin:surahs:id');

adminSurahsScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('admin:surahs');
    }
    const author = await db.controllers.authors.getById(id);
    if (!author) {
        return ctx.scene.enter('admin:surahs');
    }
    let text = "👳‍♂️ " + author.name;
    const surahs = await db.controllers.surahs.getByAuthor(id);
    let keyboard = keyboards.surahs(surahs);
    ctx.reply(text, keyboard);

});

adminSurahsScene.hears("➕ Sura qo'shish", ctx => ctx.scene.enter('admin:surahs:id:new', { authorId: ctx.scene.state.id }));

adminSurahsScene.hears("❌ Avtorni o'chirish", async (ctx) => {
    await db.controllers.authors.deleteById(ctx.scene.state.id);
    ctx.reply("✅ Avtor o'chirildi!");
    ctx.scene.enter('admin:surahs');
});

adminSurahsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:surahs'));

adminSurahsScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const surahs = await db.controllers.surahs.getByAuthor(ctx.scene.state.id);
    let surah = surahs?.find(n => n.name === name);
    if (!surah) return;
    ctx.scene.enter('admin:surahs:id:id', { surahId: surah._id, authorId: ctx.scene.state.id });
});

module.exports = adminSurahsScene;