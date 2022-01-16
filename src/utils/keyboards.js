const { Markup } = require('telegraf');

exports.start = () => Markup.keyboard([
    ['🎬 Filmlar', '🚦 Multfilmlar'],
    ['🎧 Nashidlar', "📖 Qur'on"],
    ['💬 Izoh qoldirish']
]).resize();


exports.subscribing = (channels) => {
    let keyboard = [];
    for (channel of channels) {
        keyboard.push(
            [Markup.button.url(channel.name, `https://t.me/${channel.link}`)]
        );
    };
    keyboard.push(
        [Markup.button.callback("✅ Tasdiqlash", "checkSubscribing")]
    );
    return Markup.inlineKeyboard(keyboard).resize();
}


exports.cancel = () => Markup.keyboard([
    '❌ Bekor qilish'
]).resize();

exports.back = () => Markup.keyboard([
    '◀️ Ortga'
]).resize();


exports.admin = () => Markup.keyboard([
    ["📊 Statistika"],
    ["📡 Kanallar"],
    ["🎥 Filmlar", "👼 Multfilmlar"],
    ["🎶 Nashidlar", "📗 Qur'on"],
    ["◀️ Paneldan chiqish"]
]).resize();

exports.statistics = () => Markup.keyboard([
    ["✍️ Umumiy xabar"],
    ["◀️ Ortga"]
]).resize();

exports.channels = () => Markup.keyboard([
    "➕ Kanal qo'shish",
    '◀️ Ortga'
]).resize();

exports.channel = (channel) => Markup.inlineKeyboard([
    [Markup.button.url("↗️ Kanalga o'tish", channel.link)],
    [Markup.button.callback(`❌ O'chirish`, `del_${channel._id}`)]
]).resize();


exports.series = (data, isAdmin = true) => {
    let keyboard = [];
    if (isAdmin) {
        keyboard.push(
            [Markup.button.text("➕ Film qo'shish")]
        );
    }
    for (let i = 0; i < data.length; i++) {
        keyboard.push(
            [Markup.button.text(data[i].name)]
        );
    };
    keyboard.push([Markup.button.text("◀️ Ortga")]);
    return Markup.keyboard(keyboard).resize();
};

exports.movies = (data, isAdmin = true) => {
    let keyboard = [];
    if (isAdmin) {
        keyboard.push(
            [Markup.button.text("➕ Qism qo'shish")]
        );
    }
    let row = [];
    for (let i = 0; i < data.length; i++) {
        row.push(Markup.button.text(data[i].name));
        if ((i+1) % 3 === 0 || i + 1 === data.length) {
            keyboard.push(row);
            row = [];
        }
    };
    if (isAdmin) {
        keyboard.push([Markup.button.text("❌ Filmni o'chirish")]);
    }
    keyboard.push([Markup.button.text("◀️ Ortga")]);
    return Markup.keyboard(keyboard).resize();
}

exports.movie = () => Markup.keyboard([
    [Markup.button.text("❌ Qismni o'chirish")],
    [Markup.button.text("◀️ Ortga")]
]).resize();


exports.authors = (data, isAdmin = true) => {
    let keyboard = [];
    if (isAdmin) {
        keyboard.push(
            [Markup.button.text("➕ Avtor qo'shish")]
        );
    }
    let row = [];
    for (let i = 0; i < data.length; i++) {
        row.push(Markup.button.text(data[i].name));
        if ((i+1) % 3 === 0 || i + 1 === data.length) {
            keyboard.push(row);
            row = [];
        }
    };
    keyboard.push([Markup.button.text("◀️ Ortga")]);
    return Markup.keyboard(keyboard).resize();
};


exports.nasheeds = (data, isAdmin = true) => {
    let keyboard = [];
    if (isAdmin) {
        keyboard.push(
            [Markup.button.text("➕ Nashida qo'shish")]
        );
        for (let i = 0; i < data.length; i++) {
            keyboard.push(
                [Markup.button.text(data[i].name)]
            );
        };
        keyboard.push([Markup.button.text("❌ Avtorni o'chirish")]);
    }
    keyboard.push([Markup.button.text("◀️ Ortga")]);
    return Markup.keyboard(keyboard).resize();
};

exports.nasheed = () => Markup.keyboard([
    [Markup.button.text("❌ Nashidani o'chirish")],
    [Markup.button.text("◀️ Ortga")]
]).resize();


exports.surahs = (data, isAdmin = true) => {
    let keyboard = [];
    if (isAdmin) {
        keyboard.push(
            [Markup.button.text("➕ Sura qo'shish")]
        );
        for (let i = 0; i < data.length; i++) {
            keyboard.push(
                [Markup.button.text(data[i].name)]
            );
        };
        keyboard.push([Markup.button.text("❌ Avtorni o'chirish")]);
    }
    keyboard.push([Markup.button.text("◀️ Ortga")]);
    return Markup.keyboard(keyboard).resize();
};

exports.surah = () => Markup.keyboard([
    [Markup.button.text("❌ Surani o'chirish")],
    [Markup.button.text("◀️ Ortga")]
]).resize();