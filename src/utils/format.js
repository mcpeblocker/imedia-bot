exports.bold = text => `<b>${text}</b>`;

exports.italic = text => `<i>${text}</i>`;

exports.code = text => `<code>${text}</code>`;

exports.underline = text => `<u>${text}</u>`;

exports.link = (text, link) => `<a href="${link}">${text}</a>`;