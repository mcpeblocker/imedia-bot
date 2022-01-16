const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');
const { handleActions } = require('../utils/pagination');
const pagination = require('../utils/pagination');

const nasheedScene = new BaseScene('nasheeds:id');

nasheedScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('nasheeds');
    }
    const author = await db.controllers.authors.getById(id);
    if (!author) {
        return ctx.scene.enter('nasheeds');
    }
    let text = "👳‍♂️ " + author.name;
    const nasheeds = await db.controllers.nasheeds.getByAuthor(id);
    let keyboard = keyboards.nasheeds(null, false);
    ctx.reply(text, keyboard);
    text = pagination.getText(nasheeds);
    keyboard = pagination.getKeyboard(nasheeds);
    ctx.replyWithHTML(text, keyboard);
});

handleActions(
    nasheedScene,
    async (ctx) => {
        const { id } = ctx.scene.state;
        return await db.controllers.nasheeds.getByAuthor(id);
    },
    async (ctx, item) => {
        const author = await db.controllers.authors.getById(item.author);
        let caption = `<b>${item.name}\n👳‍♂️ ${author.name}\n\n@${ctx.botInfo.username}</b>`;
        ctx.replyWithAudio(item.fileId, { caption, parse_mode: 'HTML' });
    }
);

nasheedScene.hears("◀️ Ortga", ctx => ctx.scene.enter('nasheeds'));

// nasheedScene.on('text', async ctx => {
//     let name = ctx.message?.text;
//     const nasheeds = await db.controllers.nasheeds.getByAuthor(ctx.scene.state.id);
//     let nasheed = nasheeds?.find(m => m.name === name);
//     if (!nasheed) return;
//     let caption = `${name}\n\n@${ctx.botInfo.username}`;
//     ctx.replyWithAudio(nasheed.fileId, { caption });
// });

module.exports = nasheedScene;