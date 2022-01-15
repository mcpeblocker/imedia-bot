const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const cartoonsScene = new BaseScene('admin:cartoons'); 

cartoonsScene.enter(async ctx => { 
    const series = await db.controllers.series.getAll("cartoon");
    ctx.scene.state.allSeries = series;
    let text = "🎛 Jami: " + (series?.length) || 0;
    let keyboard = keyboards.series(series);
    ctx.reply(text, keyboard);
});

cartoonsScene.hears("➕ Film qo'shish", ctx => ctx.scene.enter('admin:cartoons:new'));

cartoonsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin')); 

cartoonsScene.on('text', ctx => {
    let name = ctx.message?.text;
    let series = ctx.scene.state.allSeries?.find(s => s.name === name);
    if (!series) return;
    ctx.scene.enter('admin:cartoons:id', { id: series._id });
});

module.exports = cartoonsScene; 