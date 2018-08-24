module.exports = app => {
    return {
        auth: async (ctx, next) => {
            await next();
        }
    }
};
