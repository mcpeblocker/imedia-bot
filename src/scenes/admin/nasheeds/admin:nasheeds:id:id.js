const { Scenes: { BaseScene } } = require('telegraf');
const db = require('../../../database');
const keyboards = require('../../../utils/keyboards');

const adminNasheedScene = new BaseScene('admin:nasheeds:id:id');

adminNasheedScene.enter(async ctx => {
    const id = ctx.scene.state.nasheedId;
    if (!id) {
        return ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId });
    }
    const nasheed = await db.controllers.nasheeds.getById(id);
    if (!nasheed) {
        return ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId });    }
    let caption = "🎵 " + nasheed.name;
    let keyboard = keyboards.nasheed(nasheed);
    ctx.replyWithAudio(nasheed.fileId, { caption, ...keyboard });
});

adminNasheedScene.hears("❌ Nashidani o'chirish", async (ctx) => {
    await db.controllers.nasheeds.deleteById(ctx.scene.state.nasheedId);
    ctx.reply("✅ Nashida o'chirildi!");
    ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId });
});

adminNasheedScene.hears("◀️ Ortga", ctx => ctx.scene.enter('admin:nasheeds:id', { id: ctx.scene.state.authorId }));

module.exports = adminNasheedScene;