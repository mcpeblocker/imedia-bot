const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require('./start'),
    require('./comment'),
    require('./series'),
    require('./series:id'),
    require('./cartoons'),
    require('./cartoons:id'),
    require('./nasheeds'),
    require('./nasheeds:id'),
    require('./surahs'),
    require('./surahs:id'),
    ...require('./admin')
]);

module.exports = stage;