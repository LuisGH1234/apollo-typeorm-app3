const path = require("path");
const fs = require("fs");

function fromDir(startPath, filter, callback) {
    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    }
}

console.log("SDL Config ...");
fromDir("./src/schema", /\.gql$/, function(filename) {
    console.log("-- found:", filename);
    const destiny = filename.replace("src", "dist");
    // console.log("-- to:", destiny);
    fs.copyFileSync(filename, destiny);
});
console.log("SDL Config finished.");
