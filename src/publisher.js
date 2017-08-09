const redis = require('redis');
const client = redis.createClient();

const channel = process.argv[2];
const command = process.argv[3];

client.publish(channel, command);

client.quit();
