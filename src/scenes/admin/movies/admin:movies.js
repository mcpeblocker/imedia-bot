const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const moviesScene = new BaseScene('admin:movies'); 

moviesScene.enter(async ctx => { 
    const series = await db.controllers.series.getAll();
    ctx.scene.state.allSeries = series;
    let text = "🎛 Jami: " + (series?.length) || 0;
    let keyboard = keyboards.series(series);
    ctx.reply(text, keyboard);
});

moviesScene.hears("➕ Film qo'shish", ctx => ctx.scene.enter('admin:movies:new')); 

moviesScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin')); 

moviesScene.on('text', ctx => {
    let name = ctx.message?.text;
    let series = ctx.scene.state.allSeries?.find(s => s.name === name);
    if (!series) return;
    ctx.scene.enter('admin:movies:id', { id: series._id });
});

module.exports = moviesScene; 