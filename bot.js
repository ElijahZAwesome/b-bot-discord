var Discord = require('discord.io');
var fs = require('fs');

var voiceChannelID = "370910137805832194";
var izy = "66186356581208064";

var bot = new Discord.Client({
    token: "MzcyODkyNDE0ODU3NDQ1Mzc2.DNLDKA.oUFgVbskjGZpT85Z8lmXvRlcKfw",
    autorun: true
});
var http = require('http'); http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.send('it is running\n'); }).listen(process.env.PORT || 5000);

bot.on('disconnect', function(errMsg, code) { });

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence ( {game: {name: "Type 'help m’lady'", type: 0, url: ''}});
});

bot.on('message', function(user, userID, channelID, message, event, callback, inviteURL, usertodm) {
    console.log(userID + ' Said: "' + message + '"');
    if (message === "$$ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong!"
        });
    }
	if (message === "🅱ing") {
		bot.sendMessage({
			to: channelID,
			message: "🅱ong!"
		});
	}
    if (message === "$$dm") {
        bot.sendMessage({
			to: userID,
			message: "yo test"
		})
    }
    if (message === "$$help") {
        bot.sendMessage({
            to: channelID,
            message: "Commands: \n$$help Opens this page \n$$givemeinvite Gives the invite for this bot \n$$ping For testing, says pong back \n$$dm Sends you a test DM cause why not",
	    typing: false
        });
    }
    if (message === "$$goaway") {
        bot.disconnect();
    }
	if (message === "$$kill") {
        bot.disconnect();
    }
    if (message === "$$givemeinvite") {
	bot.sendMessage({
	    to: channelID,
	    message: "" + bot.inviteURL,
	})
	}
if (message === "$$testmusic") {
bot.joinVoiceChannel(voiceChannelID, function(error, events) {
  //Check to see if any errors happen while joining.
  if (error) return console.error(error);

  //Then get the audio context
  bot.getAudioContext(voiceChannelID, function(error, stream) {
    //Once again, check to see if any errors exist
    if (error) return console.error(error);

    //Create a stream to your file and pipe it to the stream
    //Without {end: false}, it would close up the stream, so make sure to include that.
    fs.createReadStream('myFile.mp3').pipe(stream, {end: false});

    //The stream fires `done` when it's got nothing else to send to Discord.
    stream.on('done', function() {
       //Handle
    });
  });
});
	
    }
});
