/**
 * Created by Stas on 07.08.2017.
 */
const fs = require('fs');

module.exports.writeFile = function (path, file) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(path, file, function (err) {
            if (err) reject(err);
            resolve(path)
        });
    })
};

module.exports.unlinkFile = function (path) {
    return new Promise ((resolve) => {
        fs.unlink(path, function () {
            resolve()
        });
    })
};