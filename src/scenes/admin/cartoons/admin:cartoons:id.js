const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminCartoonsScene = new BaseScene('admin:cartoons:id');

adminCartoonsScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('admin:cartoons');
    }
    const series = await db.controllers.series.getById(id);
    if (!series) {
        return ctx.scene.enter('admin:cartoons');
    }
    let text = "🎞 " + series.name;
    const cartoons = await db.controllers.movies.getBySeries(id);
    let keyboard = keyboards.movies(cartoons);
    ctx.reply(text, keyboard);

});

adminCartoonsScene.hears("➕ Qism qo'shish", ctx => ctx.scene.enter('admin:cartoons:id:new', { seriesId: ctx.scene.state.id }));

adminCartoonsScene.hears("❌ Filmni o'chirish", async (ctx) => {
    await db.controllers.series.deleteById(ctx.scene.state.id);
    ctx.reply("✅ Multfilm o'chirildi!");
    ctx.scene.enter('admin:cartoons');
});

adminCartoonsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:cartoons'));

adminCartoonsScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const cartoons = await db.controllers.movies.getBySeries(ctx.scene.state.id);
    let movie = cartoons?.find(m => m.name === name);
    if (!movie) return;
    ctx.scene.enter('admin:cartoons:id:id', { movieId: movie._id, seriesId: ctx.scene.state.id });
});

module.exports = adminCartoonsScene;