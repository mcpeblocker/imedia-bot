const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminMovieScene = new BaseScene('admin:movies:id:id');

adminMovieScene.enter(async ctx => {
    const id = ctx.scene.state.movieId;
    if (!id) {
        return ctx.scene.enter('admin:movies:id', { id: ctx.scene.state.seriesId });
    }
    const movie = await db.controllers.movies.getById(id);
    if (!movie) {
        return ctx.scene.enter('admin:movies:id', { id: ctx.scene.state.seriesId });    }
    let caption = "🎬 " + movie.name;
    let keyboard = keyboards.movie(movie);
    ctx.replyWithVideo(movie.fileId, { caption, ...keyboard });
});

adminMovieScene.hears("❌ Qismni o'chirish", async (ctx) => {
    await db.controllers.movies.deleteById(ctx.scene.state.movieId);
    ctx.reply("✅ Qism o'chirildi!");
    ctx.scene.enter('admin:movies:id', { id: ctx.scene.state.seriesId });
});

adminMovieScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:movies:id', { id: ctx.scene.state.seriesId }));

module.exports = adminMovieScene;