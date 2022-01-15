const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

const nasheedsScene = new BaseScene('nasheeds');

nasheedsScene.enter(async ctx => {
    const authors = await db.controllers.authors.getAll();
    ctx.scene.state.allAuthors = authors;
    let text = "🎛 Jami: " + (authors?.length) || 0;
    let keyboard = keyboards.authors(authors, false);
    ctx.reply(text, keyboard);
})

nasheedsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('start')); 

nasheedsScene.on('text', ctx => {
    let name = ctx.message?.text;
    let author = ctx.scene.state.allAuthors?.find(s => s.name === name);
    if (!author) return;
    ctx.scene.enter('nasheeds:id', { id: author._id });
});

module.exports = nasheedsScene;