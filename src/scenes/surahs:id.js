const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');
const pagination = require('../utils/pagination');

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
    text = pagination.getText(surahs);
    keyboard = pagination.getKeyboard(surahs);
    ctx.replyWithHTML(text, keyboard);
});

surahScene.hears("◀️ Ortga", ctx => ctx.scene.enter('surahs'));

pagination.handleActions(
    surahScene,
    async (ctx) => {
        const { id } = ctx.scene.state;
        return await db.controllers.surahs.getByAuthor(id);
    },
    async (ctx, item) => {
        const author = await db.controllers.authors.getById(item.author);
        let caption = `<b>${item.name}</b>\nQori: <b>${author.name}</b>\nOyatlar soni: <b>${item.count}</b>\nNozil bo'lgan joyi: <b>${item.place}</b>\n\n@${ctx.botInfo.username}`;
        ctx.replyWithAudio(item.fileId, { caption, parse_mode: 'HTML' });
    }
)

// surahScene.on('text', async ctx => {
//     let name = ctx.message?.text;
//     let authorId = ctx.scene.state.id;
//     const surahs = await db.controllers.surahs.getByAuthor(authorId);
//     let surah = surahs?.find(m => m.name === name);
//     if (!surah) return;
//     const author = await db.controllers.authors.getById(authorId);
//     let caption = `<b>${name}</b>\nQori: <b>${author.name}</b>\nOyatlar soni: <b>${surah.count}</b>\nNozil bo'lgan joyi: <b>${surah.place}</b>\n\n@${ctx.botInfo.username}`;
//     ctx.replyWithAudio(surah.fileId, { caption, parse_mode: 'HTML' });
// });

module.exports = surahScene;