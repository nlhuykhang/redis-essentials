import redis from 'redis';
const client = redis.createClient();

function markDealAsSent(client, dealId, userId) {
  client.sadd(dealId, userId);
}

function sendDealIfNotSent(client, dealId, userId) {
  client.sismember(dealId, userId, function(err, reply) {
    if (reply) {
      console.log(dealId, userId, 'already sent');
    } else {
      console.log(dealId, userId, 'sending');
      markDealAsSent(client, dealId, userId);
    }
  });
}

function showUsersThatReceivedAllDeals(client, dealIds) {
  client.sinter(dealIds, function(err, reply) {
    console.log(reply);
  });
}

function showUsersThatReceivedAtLeastOneOfTheDeals(client, dealIds) {
  client.sunion(dealIds, function(err, reply) {
    console.log(reply);
  });
}

markDealAsSent(client, 'deal:1', 'user:1');
markDealAsSent(client, 'deal:1', 'user:2');
markDealAsSent(client, 'deal:2', 'user:1');
markDealAsSent(client, 'deal:2', 'user:3');
sendDealIfNotSent(client, 'deal:1', 'user:1');
sendDealIfNotSent(client, 'deal:1', 'user:2');
sendDealIfNotSent(client, 'deal:1', 'user:3');
showUsersThatReceivedAllDeals(client, ["deal:1", "deal:2"]);
showUsersThatReceivedAtLeastOneOfTheDeals(client, ["deal:1", "deal:2"]);


client.quit();
