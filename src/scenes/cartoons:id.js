const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');
const adminNewCartoonScene = require('./admin/cartoons/admin:cartoons:id:new');

const cartoonsScene = new BaseScene('cartoons:id');

cartoonsScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('cartoons');
    }
    const series = await db.controllers.series.getById(id);
    if (!series) {
        return ctx.scene.enter('cartoons');
    }
    let text = "🎞 " + series.name;
    const cartoons = await db.controllers.movies.getBySeries(id);
    let keyboard = keyboards.movies(cartoons, false);
    ctx.reply(text, keyboard);

});

cartoonsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('cartoons'));

cartoonsScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const cartoons = await db.controllers.movies.getBySeries(ctx.scene.state.id);
    let cartoon = cartoons?.find(m => m.name === name);
    if (!cartoon) return;
    let caption = `${name}\n\n@${ctx.botInfo.username}`;
    ctx.replyWithVideo(cartoon.fileId, { caption });
});

module.exports = cartoonsScene;