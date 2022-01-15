const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

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
    let keyboard = keyboards.nasheeds(nasheeds, false);
    ctx.reply(text, keyboard);

});

nasheedScene.hears("◀️ Ortga", ctx => ctx.scene.enter('nasheeds'));

nasheedScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const nasheeds = await db.controllers.nasheeds.getByAuthor(ctx.scene.state.id);
    let nasheed = nasheeds?.find(m => m.name === name);
    if (!nasheed) return;
    let caption = `${name}\n\n@${ctx.botInfo.username}`;
    ctx.replyWithAudio(nasheed.fileId, { caption });
});

module.exports = nasheedScene;