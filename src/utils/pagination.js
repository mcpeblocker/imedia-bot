const { Markup } = require("telegraf");
const db = require('../database');


const getText = (
    data = [],
    page = 1,
    pageSize = 15,
    formatFn = (item, index) => `${index + 1}. ${item.name || item}`,
    headerFn = (currentPage, pageSize, total) => `Natijalar ${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize}. Jami ${total}`
) => {
    const items = getCurrentData(data, page, pageSize);

    const header = headerFn(page, pageSize, data.length);
    const itemsText = items.map(formatFn).join('\n');

    return `${header}\n${itemsText}`
};

const getKeyboard = (
    data = [],
    page = 1,
    pageSize = 15
) => {
    const items = getCurrentData(data, page, pageSize);

    let keyboard = [];
    let row = [];

    for (let i = 0; i < items.length; i++) {
        row.push(Markup.button.callback(`${i + 1}`, `page_${page}_item_${i}`));
        if (row.length === 5 || i + 1 === items.length) {
            keyboard.push(row);
            row = [];
        }
    };
    keyboard.push([
        Markup.button.callback("⬅️", "page_" + (page-1)),
        Markup.button.callback("❌", "pagination-delete"),
        Markup.button.callback("➡️", "page_" + (page+1))
    ]);
    return Markup.inlineKeyboard(keyboard);
}

const getCurrentData = (data, page, pageSize) => data.slice(((page - 1) * pageSize), (page * pageSize));


const handleActions = (scene, getData, onItem) => {
    scene.action(/page_(.+)_item_(.+)/, async (ctx) => {
        let page = ctx.match[1];
        let id = ctx.match[2];
        let data = await getData(ctx);
        let items = getCurrentData(data, page, 15);
        let item = items[id];
        onItem(ctx, item);
    });
    scene.action(/page_(.+)/, async (ctx) => {
        let page = ctx.match[1];
        if (page == 0) {
            return ctx.answerCbQuery('❗️ Bu birinchi sahifa');
        }
        const data = await getData(ctx);
        if ((page-1) * 15 > data.length) {
            return ctx.answerCbQuery('❗️ Bu oxirgi sahifa');
        }
        await ctx.deleteMessage();
        text = getText(data, page);
        keyboard = getKeyboard(data, page);
        ctx.replyWithHTML(text, keyboard);
    });
    scene.action("pagination-delete", async (ctx) => {
        await ctx.deleteMessage();
    });
}

const pagination = {
    getText,
    getKeyboard,
    handleActions
};

module.exports = pagination;