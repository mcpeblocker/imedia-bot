const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminNasheedsScene = new BaseScene('admin:nasheeds:id');

adminNasheedsScene.enter(async ctx => {
    const { id } = ctx.scene.state;
    if (!id) {
        return ctx.scene.enter('admin:nasheeds');
    }
    const author = await db.controllers.authors.getById(id);
    if (!author) {
        return ctx.scene.enter('admin:nasheeds');
    }
    let text = "👳‍♂️ " + author.name;
    const nasheeds = await db.controllers.nasheeds.getByAuthor(id);
    let keyboard = keyboards.nasheeds(nasheeds);
    ctx.reply(text, keyboard);

});

adminNasheedsScene.hears("➕ Nashida qo'shish", ctx => ctx.scene.enter('admin:nasheeds:id:new', { authorId: ctx.scene.state.id }));

adminNasheedsScene.hears("❌ Avtorni o'chirish", async (ctx) => {
    await db.controllers.authors.deleteById(ctx.scene.state.id);
    ctx.reply("✅ Avtor o'chirildi!");
    ctx.scene.enter('admin:nasheeds');
});

adminNasheedsScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:nasheeds'));

adminNasheedsScene.on('text', async ctx => {
    let name = ctx.message?.text;
    const nasheeds = await db.controllers.nasheeds.getByAuthor(ctx.scene.state.id);
    let nasheed = nasheeds?.find(n => n.name === name);
    if (!nasheed) return;
    ctx.scene.enter('admin:nasheeds:id:id', { nasheedId: nasheed._id, authorId: ctx.scene.state.id });
});

module.exports = adminNasheedsScene;