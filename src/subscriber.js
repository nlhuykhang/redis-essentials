const os = require('os');
const redis = require('redis');

const client = redis.createClient();

const commands = {};

commands.date = () => console.log(new Date());

commands.ping = () => console.log('pong');

client.on('message', (channel, commandName) => {
  if (commands.hasOwnProperty(commandName)) {
    commands[commandName]();
  } else {
    console.log('unknown command');
  }
});

client.subscribe('global', process.argv[2])
