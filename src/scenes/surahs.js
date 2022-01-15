const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

const surahsScene = new BaseScene('surahs');

surahsScene.enter(async ctx => {
    const authors = await db.controllers.authors.getAll("surah");
    ctx.scene.state.allAuthors = authors;
    let text = "🎛 Jami: " + (authors?.length) || 0;
    let keyboard = keyboards.authors(authors, false);
    ctx.reply(text, keyboard);
})

surahsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('start')); 

surahsScene.on('text', ctx => {
    let name = ctx.message?.text;
    let author = ctx.scene.state.allAuthors?.find(s => s.name === name);
    if (!author) return;
    ctx.scene.enter('surahs:id', { id: author._id });
});

module.exports = surahsScene;