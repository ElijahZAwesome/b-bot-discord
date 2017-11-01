var Discord = require('discord.io');
var fs = require('fs');
var ytdl = require('ytdl-core');

var voiceChannelID = "370910137805832194";
var bot = new Discord.Client({
    token: "MzcyODkyNDE0ODU3NDQ1Mzc2.DNLDKA.oUFgVbskjGZpT85Z8lmXvRlcKfw",
    autorun: true
});

var http = require('http')
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.send("Bot is running.")

}).listen(process.env.PORT || 3000) // Changed to valid developer port.

bot.on('disconnect', function(errMsg, code) {});
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.setPresence({
        game: {
            name: "Type '$$help'"
        }
    });
})
bot.on('message', function(user, userID, channelID, message, event, callback, inviteURL, usertodm) {
    if (userID == '372892414857445376') {
        console.log('Bot replied ' + '"' + message + '"');
    } else if (userID !== '372892414857445376') {
        console.log(userID + ' Said: "' + message + '"');
    }
    // Kill on non-bot message
    if (!message.startsWith("$$") &&
        !message.startsWith("🅱")) return

    if (message == "$$setpres") {
        bot.setPresence({
            game: {
                name: "Type '$$help'"
            }
        });

        bot.sendMessage({
            to: channelID,
            message: "Presence set."
        });
    } else if (message == "$$ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong!"
        });
    } else if (message == "🅱ing") {
        bot.sendMessage({
            to: channelID,
            message: "🅱ong!"
        });
    } else if (message == "$$dm") {
        bot.sendMessage({
            to: userID,
            message: "yo test"
        });
        bot.sendMessage({
            to: channelID,
            message: "DM has been sent"
        })
    } else if (message === "$$help") {
        bot.sendMessage({
            to: channelID,
            message: "Commands: \n$$help Opens this page \n$$givemeinvite Gives the invite for this bot \n$$ping For testing, says pong back \n$$dm Sends you a test DM cause why not \n$$youtube (link) Plays the youtube link in your voice channel \n$$stop Stops whatever is being played.",
            typing: false
        });
    } else if (
        message == "$$goaway" ||
        message == "$$kill") {
        bot.disconnect();
    } else if (message === "$$givemeinvite") {
        bot.sendMessage({
            to: channelID,
            message: "" + bot.inviteURL,
        })
    } else if (message === "$$repeat") {
        var repeat = 1;
    } else if (message === "$$music") {
        var serverID = bot.channels[channelID].guild_id;
        var chan = bot.servers[serverID].members[userID].voice_channel_id;
        bot.joinVoiceChannel(chan, function(error, events) {
            if (error) return console.error(error), bot.sendMessage({
                to: channelID,
                message: "Could not join voice channel. Make sure to join a channel before using this command."
            });
            console.log("Joined voice channel");
            bot.getAudioContext(chan, function(error, stream) {
                if (error) return console.error(error);
                fs.createReadStream('myFile.mp3').pipe(stream, {
                    end: false
                });
                console.log("streaming shiz");
                stream.on('done', function() {
                    console.log("Done")
                    if (repeat === 1) {
                        bot.getAudioContext(chan, function(error, stream) {
                            if (error) return console.error(error);
                            fs.createReadStream('myFile.mp3').pipe(stream, {
                                end: false
                            });
                            console.log("streaming shiz");
                            stream.on('done', function() {
                                console.log("Done")
                                if (repeat === 1) {

                                }
                                bot.leaveVoiceChannel(chan, function(error, events) {});
                            });
                        });
                    }
                    bot.leaveVoiceChannel(chan, function(error, events) {});
                });
            });
        });
    } else if (message === "$$aintnobreaksontherapetrain") {
        var serverID = bot.channels[channelID].guild_id;
        var chan = bot.servers[serverID].members[userID].voice_channel_id;
        bot.joinVoiceChannel(chan, function(error, events) {
            if (error) return console.error(error), bot.sendMessage({
                to: channelID,
                message: "Could not join voice channel. Make sure to join a channel before using this command."
            });
            console.log("Joined voice channel");
            bot.getAudioContext(chan, function(error, stream) {
                if (error) return console.error(error);
                fs.createReadStream('rape.mp3').pipe(stream, {
                    end: false
                });
                console.log("streaming shiz");
                stream.on('done', function() {
                    bot.getAudioContext(chan, function(error, stream) {
                        if (error) return console.error(error);
                        fs.createReadStream('rape.mp3').pipe(stream, {
                            end: false
                        });
                        console.log("streaming shiz");
                        stream.on('done', function() {

                        });
                    });
                });
            });
        });
    } else if (message === "$$stop") {
        var serverID = bot.channels[channelID].guild_id;
        var chan = bot.servers[serverID].members[bot.id].voice_channel_id;
        bot.leaveVoiceChannel(chan, function(error, events) {
            if (error) return console.error(error), bot.sendMessage({
                to: channelID,
                message: "Could not leave voice channel. Make sure your in the same channel.?"
            });
        });
        console.log("left");
    } else if (message.startsWith("$$youtube")) {

        var serverID = bot.channels[channelID].guild_id;
        var chan = bot.servers[serverID].members[userID].voice_channel_id;
        bot.joinVoiceChannel(chan, function(error, events) {
                if (error) return console.error(error), bot.sendMessage({
                    to: channelID,
                    message: "Could not join voice channel. Make sure to join a channel before using this command."
                });
                console.log("Joined voice channel");
                bot.getAudioContext(chan, function(error, stream) {
                        if (error) return console.error(error), bot.sendMessage({
                            to: channelID,
                            message: "Could not connect to voice channel, make sure your in one. If you are... idk"
                        });
                        if (message.indexOf('youtube.com') >= 0) {
                            var id = message.substr(message.indexOf("=") + 1);
                        }
                        if (message.indexOf('youtu.be') >= 0) {
                            if (message.indexOf('http') >= 0) {
                                var id = message.slice(26);
                            }
                            if (message.indexOf('https') >= 0) {
                                var id = message.slice(27);
                            }
                        }
                        ytdl('http://www.youtube.com/watch?v=' + id)
                            .pipe(stream, {
                                end: false
                            }); stream.on('done', function() {
                        bot.leaveVoiceChannel(chan, function(error, events) {});
                    });
                });
        });

} else if (message.startsWith("$$changenick")) {
    console.log("changenick command received.");
    var nick = message.substr(message.indexOf('"') + 1);
    console.log(nick);
    nick.replace(/"/g, "");
    bot.editNickname({
        serverID: serverID,
        userID: userID,
        nick: "" + nick
    });
}
});