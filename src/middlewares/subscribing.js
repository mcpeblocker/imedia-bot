const db = require("../database");
const keyboards = require('../utils/keyboards');

module.exports = async (ctx, next) => {
    if (ctx.callbackQuery?.data === "checkSubscribing") {
        await ctx.deleteMessage();
    }
    let channels = await db.controllers.channels.getAll();
    let allowedStatuses = ['creator', 'administrator', 'member'];
    for (channel of channels) {
        let username = `@${channel.link}`;
        try {
            const { status } = await ctx.telegram.getChatMember(username, ctx.from.id); 
            if (allowedStatuses.includes(status)) {
                channels = channels.filter(c => c !== channel);
            }
        } catch (err) {}
    }
    if (!channels.length) {
        return next();
    }
    const text = "❗️ Botdan to'liq foydalanish imkoniga quyidagi kanallarga a'zo bo'lish orqali erishishingiz mumkin!";
    const keyboard = keyboards.subscribing(channels);
    return ctx.reply(text, keyboard);
}