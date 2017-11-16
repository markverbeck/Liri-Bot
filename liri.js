var keys = require("./keys.js");
var twitter = require('twitter');
var arg1 = process.argv[2];

var client = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

if(arg1 === "my-tweets"){
var params = {screen_name: 'mvtatertot', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
    	console.log("Tweet: " + tweets[i].text);
    	console.log("Created: " + tweets[i].created_at);
    }
  }
  
});
};

 // console.log(keys.consumer_key);

