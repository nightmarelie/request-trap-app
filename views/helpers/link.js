module.exports = hbs => (text, options) => {
    const attrs = [];
    for(const prop in options.hash) {
        attrs.push(`${prop} = "/${text}${options.hash[prop]}"`);
    }
    return new hbs.SafeString(
        `<a ${attrs.join(" ")}>${text}</a>`
    );
};
