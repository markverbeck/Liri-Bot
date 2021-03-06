var keys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var moment = require('moment');
var arg2 = process.argv;
var arg1 = arg2[2];
var choiceName = "";
var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");




for (var i = 3; i < arg2.length; i++) {
	choiceName = choiceName + "+" + arg2[i];
}
var logEntry ="* " + arg1 + " " + choiceName + " " + date + "\n";

// Twitter
var client = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var twitter = function(){
var params = {screen_name: 'mvtatertot', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
    	console.log("Tweet: " + tweets[i].text);
    	console.log("")
    	console.log("Created: " + tweets[i].created_at);
    	console.log("=======================================================================================")
    }
  }
  
});
};

// Spotify
 
var spotify = new Spotify({
  id: "184e82c3ccee49c38ac2e7a1782f7a45",
  secret: "952b5eefd0674d82997e686973a8449e"
});

var spotifyRun = function(){
	if(choiceName === ""){
		choiceName = "cissy strut";
	}
 
	spotify.search({ type: 'track', query: choiceName , limit: 20}, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  
 	var items = data.tracks.items;

 	 for (var i = 0; i < items.length; i++) {
 	 	console.log("");
 	 	console.log("==========================================================================================")
 		console.log("Artist: " + data.tracks.items[i].artists[0].name)
 		console.log("")
 		console.log("Album: " + data.tracks.items[i].album.name);
 		console.log("")
 		console.log("Song Title: " + data.tracks.items[i].name); 
 		console.log("")
 		console.log("Spotify Link: " + data.tracks.items[i].album.external_urls.spotify);
 		console.log("===========================================================================================")

 	}
});
};



// OMDB


var omdb = function(){
	if (choiceName === ""){
		choiceName = "Mr. Nobody"
	}


	var queryUrl = "http://www.omdbapi.com/?t=" + choiceName + "&apikey=trilogy";


	request(queryUrl, function(error, request, body){

		var d = JSON.parse(body);
		console.log("");
		console.log("===============================================================================================")
		console.log("Title: " + d.Title);
		console.log("");
		console.log("Release Year: " + d.Year);
		console.log("");
		console.log("IMDB Rating: " + d.imdbRating);
		console.log("");
		console.log("Country Produced In: " + d.Country);
		console.log("");
		console.log("Language: " + d.Language);
		console.log("");
		console.log("Plot: " + d.Plot);
		console.log("");
		console.log("Actors: " + d.Actors);
		console.log("===============================================================================================")
		console.log("");
	});
};

fs.appendFile("log.txt", logEntry, function(err){
	if(err){
		console.log(err);
	}
	console.log("Log Updated..")
})

var runCommand = function(a){
	switch(a){
		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			spotifyRun();
			break;
		case "movie-this":
			omdb();
			break;
		case "do-what-it-says":
		fs.readFile("random.txt", "utf8", function(err, data){
			if(err){
				console.log(err);
			}
			var info = data.split(",");
			arg1 = info[0];
			choiceName = info[1];
			runCommand(arg1);
		})
	}

}

runCommand(arg1);
debugger;

