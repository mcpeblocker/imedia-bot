const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../database');
const keyboards = require('../utils/keyboards');

const seriesScene = new BaseScene('cartoons');

seriesScene.enter(async ctx => {
    const series = await db.controllers.series.getAll("cartoon");
    ctx.scene.state.allSeries = series;
    let text = "🎛 Jami: " + (series?.length) || 0;
    let keyboard = keyboards.series(series, false);
    ctx.reply(text, keyboard);
})

seriesScene.hears("◀️ Ortga", ctx => ctx.scene.enter('start')); 

seriesScene.on('text', ctx => {
    let name = ctx.message?.text;
    let series = ctx.scene.state.allSeries?.find(s => s.name === name);
    if (!series) return;
    ctx.scene.enter('cartoons:id', { id: series._id });
});

module.exports = seriesScene;