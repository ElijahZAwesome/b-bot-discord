console.log("started");
if(process.argv.length < 3) throw("Not enough arguments provided to child_jimp.js");

const fs = require('fs');
const jimp = require("jimp");
const quality = parseInt(process.argv[2], 10);

console.log("deep frying meme");
Jimp.read("lenna.png", function(err, masklenna) {
    if (err) throw err;

    masklenna
	    .contrast(1)
	    .contrast(1)
	    .quality(1)
	    .color([
	    { apply: 'saturate', params: [ 100 ] },
		{apply: 'brighten', params: [ 30 ] },
		{ apply: 'saturate', params: [ 100 ] }
	])
        .write("test.jpeg");
		console.log("meme deep fried");
    setTimeout(() => {
        bot.uploadFile({
            to: channelID,
            file: "test.jpeg"
        }, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            fs.unlink("test.jpeg");
        });
    }, 200);
	console.log("meme sent");
});
});