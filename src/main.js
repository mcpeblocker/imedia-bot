require('dotenv').config();
require('./database');

const bot = require("./core/bot");
const session = require("./core/session");
const stage = require('./scenes');
const isAdmin = require('./middlewares/isAdmin');
const { isProduction } = require('./utils');
const auth = require('./middlewares/auth');
const subscribing = require('./middlewares/subscribing');
const config = require('./utils/config');

bot.use(session());
bot.use((ctx, next) => { if (!ctx.session) { ctx.session = {}; }; next()});
bot.use(auth);

bot.use(subscribing);

bot.use(stage.middleware());

bot.start(ctx => ctx.scene.enter('start'));

bot.command('admin', isAdmin, ctx => ctx.scene.enter('admin'));

bot.on('message', ctx => ctx.scene.enter('start'));

// bot.action("checkSubscribing", async (ctx) => {
//     await ctx.deleteMessage();
// });

bot.command('flush', isAdmin, (ctx) => {
    ctx.session = null
    ctx.reply("✅");
})

bot.catch((err, ctx) => {
    if (isProduction()) return;
    console.log(err);
    console.log(ctx);
})

bot.launch()
    .then(() => {
        console.log("Bot is running. Username: ", `@${bot.botInfo.username}`);
    })
    .catch(err => {
        throw err;
    });