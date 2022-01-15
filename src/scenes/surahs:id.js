const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

const surahScene = new BaseScene('surahs:id');

surahScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('surahs');
    }
    const author = await db.controllers.authors.getById(id);
    if (!author) {
        return ctx.scene.enter('surahs');
    }
    let text = "👳‍♂️ " + author.name;
    const surahs = await db.controllers.surahs.getByAuthor(id);
    let keyboard = keyboards.surahs(surahs, false);
    ctx.reply(text, keyboard);

});

surahScene.hears("◀️ Ortga", ctx => ctx.scene.enter('surahs'));

surahScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const surahs = await db.controllers.surahs.getByAuthor(ctx.scene.state.id);
    let surah = surahs?.find(m => m.name === name);
    if (!surah) return;
    let caption = `${name}\n\n@${ctx.botInfo.username}`;
    ctx.replyWithAudio(surah.fileId, { caption });
});

module.exports = surahScene;