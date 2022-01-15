const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const nasheedsScene = new BaseScene('admin:nasheeds'); 

nasheedsScene.enter(async ctx => { 
    const authors = await db.controllers.authors.getAll();
    ctx.scene.state.allAuthors = authors;
    let text = "🎛 Jami: " + (authors?.length) || 0;
    let keyboard = keyboards.authors(authors);
    ctx.reply(text, keyboard);
});

nasheedsScene.hears("➕ Avtor qo'shish", ctx => ctx.scene.enter('admin:nasheeds:new')); 

nasheedsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin')); 

nasheedsScene.on('text', ctx => {
    let name = ctx.message?.text;
    let author = ctx.scene.state.allAuthors?.find(a => a.name === name);
    if (!author) return;
    ctx.scene.enter('admin:nasheeds:id', { id: author._id });
});

module.exports = nasheedsScene; 