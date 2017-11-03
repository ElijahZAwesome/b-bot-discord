var cluster = require('cluster');
function deepfrymeme() {
	var cluster = require('cluster');
	
	if (cluster.isMaster) {
	  cluster.fork();
	  console.log("forking cluster");

	  cluster.on('exit', function(worker, code, signal) {
	    cluster.fork();
	  });
	}

	if (cluster.isWorker) {
        console.log("deep frying meme in cluster");
        console.log(link);
        Jimp.read("h" + link, function(err, masklenna) {
            if (err) throw err;

            masklenna
                .contrast(1)
                .contrast(1)
                .quality(1)
                .color([{
                        apply: 'saturate',
                        params: [100]
                    },
                    {
                        apply: 'brighten',
                        params: [30]
                    },
                    {
                        apply: 'saturate',
                        params: [100]
                    }
                ])
            if (masklenna.getExtension() === "png") {
                masklenna.write("test.jpeg");
            } else if (masklenna.getExtension() === "jpg") {
                masklenna.write("test.jpeg");
            } else if (masklenna.getExtension() === "jpeg") {
                masklenna.write("test.jpeg");
            } else if (masklenna.getExtension() === "bmp") {
                masklenna.write("test.jpeg");
            } else if (masklenna.getExtension() === "gif") {
                masklenna.write("test.jpeg");
            } else {
                console.log("bad format");
                bot.sendMessage({
                    to: channelID,
                    message: "Your image isn't in the correct format. Use PNG, JPG/JPEG, BPM, or GIF"
                });
            }
            console.log("meme deep fried");
            setTimeout(() => {
                bot.uploadFile({
                    to: universalchannelID,
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
	}
}
if (cluster.isMaster) {
  cluster.fork();
  console.log("forking cluster");

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  var Discord = require('discord.io');
  var fs = require('fs');
  var ytdl = require('ytdl-core');
  var Jimp = require("jimp");
  var Worker = require('webworker-threads').Worker;
  var child_process = require('child_process');

  var link;
  var universalchannelID;
  var bot = new Discord.Client({
      token: "MzcyODkyNDE0ODU3NDQ1Mzc2.DNLDKA.oUFgVbskjGZpT85Z8lmXvRlcKfw",
      autorun: true
  });

  var http = require('http')
  http.createServer(function(req, res) {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
      })
      res.send("Bot is running")

  }).listen(process.env.PORT || 3001) // Changed to valid developer port.

  var fs = require('fs');
  fs.watchFile('bot.js', () => {
    console.log("code edited, restarting");
    process.exit();
  });
  
  bot.on('disconnect', function(errMsg, code) {console.log(errMsg + "\n\n" + code); bot.connect();});
  bot.on('ready', function() {
      console.log('Logged in as %s - %s\n', bot.username, bot.id);
      bot.setPresence({
          game: {
              name: "Type '$$help'"
          }
      });
  })
  bot.on('message', function(user, userID, channelID, message, event, callback, inviteURL) {
      if (userID == '372892414857445376') {
          console.log('Bot replied ' + '"' + message + '"');
      } else if (userID !== '372892414857445376') {
          if (!nick) {
              console.log(user + ' Said: "' + message + '"');
          }
          if (nick) {
              console.log(nick + ' Said: "' + message + '"');
          }
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
              message: "Commands: \n$$help || Sends this message \n$$givemeinvite || Gives the invite for this bot \n$$ping || For testing, says pong back \n$$dm || Sends you a test DM cause why not \n$$changenick -*nickname* || Changes your nickname to what you choose (doesnt work on server owner)\n$$youtube *link* || Plays the youtube link in your voice channel \n$$stop || Stops whatever is being played. \n$$deepfry *link* || Deep fries the image link you give it. (careful with this, it lags. the bot)",
              typing: false
          });
      } else if (message === "$$restart") {
		  console.log('restarting..');
		  process.exit();
      } else if (message === "$$givemeinvite") {
          bot.sendMessage({
              to: channelID,
              message: "" + bot.inviteURL,
          })
      } else if (message.startsWith("$$delet")) {
          bot.getMessages({
              channelID: channelID,
              limit: 3
          }, function(error, messageArray) {
              if (error) return console.error(error);
          });
          bot.deleteMessages({
              channelID: channelID,
              messageIDs: messageArray
          });
      } else if (message === "$$thot") {
          bot.sendMessage({
              to: channelID,
              message: "Omae wa mou Shindeiru",
              typing: false
          });
          bot.uploadFile({
              to: channelID,
              file: "thot.gif",
              message: "***N A N I?!??!!?!***"
          });
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
              console.log("Joined voice channel");
              bot.getAudioContext(chan, function(error, stream) {
                  if (error) return console.error(error), bot.sendMessage({
                      to: channelID,
                      message: "Could not connect to voice channel, make sure your in one. If you are... idk"
                  });
                  if (id !== 'pXg8Pdfgd8U') {};
                  ytdl('http://www.youtube.com/watch?v=' + id)
                      .pipe(stream, {
                          end: false
                      });
                  stream.on('done', function() {
                      bot.leaveVoiceChannel(chan, function(error, events) {});
                  });
              });
          });

      } else if (message.startsWith("$$changenick")) {
          console.log("changenick command received.");
          var serverID = bot.channels[channelID].guild_id;
          var nick = message.substr(message.indexOf('-') + 1);
          console.log(nick);
          bot.editNickname({
              serverID: serverID,
              userID: userID,
              nick: nick
          }, function(error) {
              if (error) return console.error(error), bot.sendMessage({
                  to: channelID,
                  message: "Nickname change failed. Make sure I have the permissions to do so."
              });
          });
      } else if (message === '$$moana') {
          bot.sendMessage({
              to: channelID,
              message: "https://pastebin.com/29H57CWc"
          });
      } else if (message.startsWith('$$deepfry')) {
          bot.simulateTyping({
              channelID: channelID
          });
          if (message.indexOf('http') >= 0) {
              link = message.substr(message.indexOf("h") + 1);
              universalchannelID = channelID;
              console.log(link);
              deepfry();
          } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Make sure to provide a link to an image."
              });
          }
      }
  });

  function deepfry() {
      console.log("deep frying meme");
      console.log(link);
      Jimp.read("h" + link, function(err, masklenna) {
          if (err) throw err;

          masklenna
              .contrast(1)
              .contrast(1)
              .quality(1)
              .color([{
                      apply: 'saturate',
                      params: [100]
                  },
                  {
                      apply: 'brighten',
                      params: [30]
                  },
                  {
                      apply: 'saturate',
                      params: [100]
                  }
              ])
          if (masklenna.getExtension() === "png") {
              masklenna.write("test.jpeg");
          } else if (masklenna.getExtension() === "jpg") {
              masklenna.write("test.jpeg");
          } else if (masklenna.getExtension() === "jpeg") {
              masklenna.write("test.jpeg");
          } else if (masklenna.getExtension() === "bmp") {
              masklenna.write("test.jpeg");
          } else if (masklenna.getExtension() === "gif") {
              masklenna.write("test.jpeg");
          } else {
              console.log("bad format");
              bot.sendMessage({
                  to: channelID,
                  message: "Your image isn't in the correct format. Use PNG, JPG/JPEG, BPM, or GIF"
              });
          }
          console.log("meme deep fried");
          setTimeout(() => {
              bot.uploadFile({
                  to: universalchannelID,
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
  }
}