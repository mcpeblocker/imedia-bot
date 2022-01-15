const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminMoviesScene = new BaseScene('admin:movies:id');

adminMoviesScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('admin:movies');
    }
    const series = await db.controllers.series.getById(id);
    if (!series) {
        return ctx.scene.enter('admin:movies');
    }
    let text = "🎞 " + series.name;
    const movies = await db.controllers.movies.getBySeries(id);
    let keyboard = keyboards.movies(movies);
    ctx.reply(text, keyboard);

});

adminMoviesScene.hears("➕ Qism qo'shish", ctx => ctx.scene.enter('admin:movies:id:new', { seriesId: ctx.scene.state.id }));

adminMoviesScene.hears("❌ Filmni o'chirish", async (ctx) => {
    await db.controllers.series.deleteById(ctx.scene.state.id);
    ctx.reply("✅ Film o'chirildi!");
    ctx.scene.enter('admin:movies');
});

adminMoviesScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:movies'));

adminMoviesScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const movies = await db.controllers.movies.getBySeries(ctx.scene.state.id);
    let movie = movies?.find(m => m.name === name);
    if (!movie) return;
    ctx.scene.enter('admin:movies:id:id', { movieId: movie._id, seriesId: ctx.scene.state.id });
});

module.exports = adminMoviesScene;