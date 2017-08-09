import redis from 'redis';
const client = redis.createClient();

function LeaderBoard(client, key) {
  this.key = key;
  this.client = client;
}

LeaderBoard.prototype.addUser = function(username, score) {
  this.client.zadd([this.key, score, username], function(err) {
    console.log(username, 'add');
  });
}

LeaderBoard.prototype.removeUser = function(username) {
  this.client.zrem(this.key, username, function() {
    console.log(username, 'remove');
  });
}

LeaderBoard.prototype.getUserScoreAndRank = function(username) {
  const key = this.key;
  const client = this.client;

  client.zscore(key, username, function(err, score) {
    client.zrevrange(key, username, function(err, rank) {
      console.log(username, score, rank);
    });
  });
};

LeaderBoard.prototype.showTopUsers = function(quantity) {
  this.client.zrevrange([this.key, 0, quantity - 1, 'withscores'], function(err, replies) {
    console.log('top users: ', replies);
  });
};

const leaderBoard = new LeaderBoard(client, 'game-score');

leaderBoard.addUser("Arthur", 70.);
leaderBoard.addUser("KC", 20.);
leaderBoard.addUser("Maxwell", 10.);
leaderBoard.addUser("Patrik", 30.);
leaderBoard.addUser("Ana", 60.);
leaderBoard.addUser("Felipe", 40.);
leaderBoard.addUser("Renata", 50.);
leaderBoard.addUser("Hugo", 80.);
leaderBoard.removeUser("Arthur");

leaderBoard.getUserScoreAndRank("Maxwell");
leaderBoard.showTopUsers(3);

client.quit();
