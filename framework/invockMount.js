module.exports = (items, mount = {}) => {
    return items.map((item) => {
            const temp = {};
            Object.keys(item).map(ii => {
                temp[ii] = function (ctx) {
                    return new item[ii]({ ...mount,
                        ctx
                    })
                }
            })
            return temp
        })
        .reduce((obj, item) => ({ ...obj,
            ...item
        }), {})
}