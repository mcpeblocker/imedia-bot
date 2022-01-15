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

    let text = bold("📊 Statistika\n");
    text += bold("\n👤 Foydalanuvchilar soni: ") + users;
    text += bold("\n\n🎬 Filmlar soni: ") + movieSeries;
    text += bold("\n🚘 Multfimlar soni: ") + cartoonSeries;
    text += bold("\n\n👳‍♂️ Nashida avtorlari: ") + nasheedAuthors;
    text += bold("\n👳‍♂️ Su'ra avtorlari: ") + surahAuthors;
    text += bold("\n🎵 Nashidalar soni: ") + nasheeds;
    text += bold("\n🎶 Su'ralar soni: ") + surahs;
    text += bold("\n\n📡 Kanallar soni: ") + channels;

    let keyboard = keyboards.back();
    ctx.replyWithHTML(text, keyboard);
});

statisticsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin'));

module.exports = statisticsScene;

