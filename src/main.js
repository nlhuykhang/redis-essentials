import redis from 'redis';

const client = redis.createClient();

client.set('test', 'test key value');

client.get('test', redis.print);


client.quit();
