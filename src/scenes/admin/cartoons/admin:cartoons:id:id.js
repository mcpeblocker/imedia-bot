const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminCartoonsScene = new BaseScene('admin:cartoons:id:id');

adminCartoonsScene.enter(async ctx => {
    const id = ctx.scene.state.movieId;
    if (!id) {
        return ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId });
    }
    const cartoon = await db.controllers.movies.getById(id);
    if (!cartoon) {
        return ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId });    }
    let caption = "🚘 " + cartoon.name;
    let keyboard = keyboards.movie(cartoon);
    ctx.replyWithVideo(cartoon.fileId, { caption, ...keyboard });
});

adminCartoonsScene.hears("❌ Qismni o'chirish", async (ctx) => {
    await db.controllers.movies.deleteById(ctx.scene.state.movieId);
    ctx.reply("✅ Qism o'chirildi!");
    ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId });
});

adminCartoonsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:cartoons:id', { id: ctx.scene.state.seriesId }));

module.exports = adminCartoonsScene;