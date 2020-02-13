//Adds the code to read and set enviorment variables with dotenv package
require("dotenv").config();
//Adds the code required to import the key.js file and store it in a variable
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify)
var fs = require("fs");

//Variables for the arguments to be entered by the user
var appCommand = process.argv[2];
console.log("App Command is: " + appCommand);
var userSearch = process.argv.slice(3).join(" ");
console.log("User Search is: " + userSearch);

//Function where all the switch logic will go
function runLiri(appCommand, userSearch) {
   switch (appCommand) {
      case "concert-this":
         getBandsInTown(userSearch);
         break;

      case "movie-this":
         getOMDB(userSearch);
         break;

      case "spotify-this-song":
         getSpotify(userSearch)
         break;

      case "do-what-it-says":
         getDoWhatItDo();
         break;
         //If user doesn't enter anything
         default:
         console.log("YO! Buttercup! Enter one of the following PHRASES! concert-this, spotify-this-song, or movie-this. ")

   }

}

//========================Function to search Bands In Town=================================================
function getBandsInTown(artist) {

   var artist = userSearch;
   var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

   axios.get(bandsInTownUrl).then(function (response) {
      //console.log(response.data)
      console.log("===============================================");
      console.log("Name of the Band: " + userSearch)
      console.log("Name of the Venue: " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city);
      console.log("Date of the Event :" + moment(response.data[0].datetime).format('MM/DD/YYYY'));
   })

}
//=========================================================================================================
function getOMDB(movie) {

   var OmdbUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

   axios.get(OmdbUrl).then(function (response) {
      //console.log(response.data); 
      console.log("==================================================")
      console.log("Movie Title: " + response.data.Title)
      console.log("Year Released: " + response.data.Year)
      console.log("IMDB Rating: " + response.data.imdbRating)
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
      console.log("Country Where Produced: " + response.data.Country)
      console.log("Language: " + response.data.Language)
      console.log("Plot: " + response.data.Plot)
      console.log("Actors: " + response.data.Actors)
   })
}
//=============Get Spotify Songs and Information================================================================
function getSpotify(songName) {

   var spotify = new Spotify(keys.spotify)
  // console.log("Spotify Key: " + spotify);

   spotify.search({type:'track', query: songName}, function (err, data) {
       if (err) {
           return console.log('Error occurred: ' + err);
       }

       console.log("==========================================")
       //console.log("Data.Tracks.items is " + JSON.stringify(data.tracks.items[0]))

       console.log("Song Searched For: " + userSearch);
       console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name)
       console.log("Album Name: ", data.tracks.items[0].album.name)
       console.log("Relase Date: ", data.tracks.items[0].album.release_date)
       console.log("Preview Link: ", data.tracks.items[0].preview_url)
   });
}




runLiri(appCommand, userSearch);