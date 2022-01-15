const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const surahsScene = new BaseScene('admin:surahs'); 

surahsScene.enter(async ctx => { 
    const authors = await db.controllers.authors.getAll("surah");
    ctx.scene.state.allAuthors = authors;
    let text = "🎛 Jami: " + (authors?.length) || 0;
    let keyboard = keyboards.authors(authors);
    ctx.reply(text, keyboard);
});

surahsScene.hears("➕ Avtor qo'shish", ctx => ctx.scene.enter('admin:surahs:new')); 

surahsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin')); 

surahsScene.on('text', ctx => {
    let name = ctx.message?.text;
    let author = ctx.scene.state.allAuthors?.find(a => a.name === name);
    if (!author) return;
    ctx.scene.enter('admin:surahs:id', { id: author._id });
});

module.exports = surahsScene; 