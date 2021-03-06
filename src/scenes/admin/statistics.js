const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../database');
const keyboards = require('../../utils/keyboards');
const { bold, italic } = require('../../utils/format');

const statisticsScene = new BaseScene('admin:statistics');

statisticsScene.enter(async (ctx) => {
    // users
    const users = await db.controllers.users.getCount();

    // videos
    const movieSeries = await db.controllers.series.getCount("movie");
    const cartoonSeries = await db.controllers.series.getCount("cartoon");
    // const movies = await db.controllers.movies.getCount();

    // audios
    const nasheedAuthors = await db.controllers.authors.getCount("nasheed");
    const surahAuthors = await db.controllers.authors.getCount("surah");
    const nasheeds = await db.controllers.nasheeds.getCount();
    const surahs = await db.controllers.nasheeds.getCount();

    // channels
    const channels = await db.controllers.channels.getCount();

    let text = bold("š Statistika\n");
    text += bold("\nš¤ Foydalanuvchilar soni: ") + users;
    text += bold("\n\nš¬ Filmlar soni: ") + movieSeries;
    text += bold("\nš Multfimlar soni: ") + cartoonSeries;
    text += bold("\n\nš³āāļø Nashida avtorlari: ") + nasheedAuthors;
    text += bold("\nš³āāļø Su'ra avtorlari: ") + surahAuthors;
    text += bold("\nšµ Nashidalar soni: ") + nasheeds;
    text += bold("\nš¶ Su'ralar soni: ") + surahs;
    text += bold("\n\nš” Kanallar soni: ") + channels;

    let keyboard = keyboards.statistics();
    ctx.replyWithHTML(text, keyboard);
});

statisticsScene.hears("āļø Ortga", ctx => ctx.scene.enter('admin'));
statisticsScene.hears("āļø Umumiy xabar", ctx => ctx.scene.enter('admin:commonMsg'));

module.exports = statisticsScene;

