var walk = require('walk')
const path = require('path')
module.exports = {
    getFileList: function (pathAddress) {
        const files = []
        walk.walkSync(pathAddress, {
            followLinks: false,
            listeners: {
                names: function (roots, stat, next) {
                    next();
                },
                file: function (roots, stat, next) {
                    files.push(path.resolve(roots, stat.name));
                    next();
                }
            }
        });
        return files;
    }
};
