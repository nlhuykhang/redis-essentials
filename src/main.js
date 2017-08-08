import redis from 'redis';
const client = redis.createClient();

function saveLink(client, id, author, title, link) {
  client.hmset(`link:${id}`, 'author', author, 'title', title, 'link', link, 'score', 0);
}

function upVote(client, id) {
  client.hincrby(`link:${id}`, 'score', 1);
}

function downVote(client, id) {
  client.hincrby(`link:${id}`, 'score', -1);
}

function showDetails(client, id) {
  client.hgetall(`link:${id}`, (err, result) => {
    console.log(result);
  });
}

saveLink(client, 123, "dayvson", "Maxwell Dayvson's Github page", "https://github.com/dayvson");
upVote(client, 123);
upVote(client, 123);
saveLink(client, 456, "hltbra", "Hugo Tavares's Github page", "https://github.com/hltbra");
upVote(client, 456);
upVote(client, 456);
downVote(client, 456);

showDetails(client, 123);
showDetails(client, 456);

client.quit();
