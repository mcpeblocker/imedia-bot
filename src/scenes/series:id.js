const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

const moviesScene = new BaseScene('movies:id');

moviesScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('movies');
    }
    const series = await db.controllers.series.getById(id);
    if (!series) {
        return ctx.scene.enter('movies');
    }
    let text = "🎞 " + series.name;
    const movies = await db.controllers.movies.getBySeries(id);
    let keyboard = keyboards.movies(movies, false);
    ctx.reply(text, keyboard);

});

moviesScene.hears("◀️ Ortga", ctx => ctx.scene.enter('movies'));

moviesScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const movies = await db.controllers.movies.getBySeries(ctx.scene.state.id);
    let movie = movies?.find(m => m.name === name);
    if (!movie) return;
    let caption = `${name}\n\n@${ctx.botInfo.username}`;
    ctx.replyWithVideo(movie.fileId, { caption });
});

module.exports = moviesScene;