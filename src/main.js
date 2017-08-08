import redis from 'redis';
const client = redis.createClient();

function upVote(client, id) {
  client.incr(`article:${id}:votes`);
}

function downVote(client, id) {
  client.decr(`article:${id}:votes`);
}

function showResults(client, id) {
  client.mget([
    `article:${id}:headline`,
    `article:${id}:votes`
  ], function(err, replies) {
    console.log(replies);
  });
}

upVote(client, 1);
upVote(client, 1);
upVote(client, 1);
upVote(client, 1);
upVote(client, 1);
downVote(client, 1);

showResults(client, 1);

client.quit();
