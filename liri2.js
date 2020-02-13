//Adds the code to read and set enviorment variables with dotenv package
require("dotenv").config();
//Adds the code required to import the key.js file and store it in a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
//var Spotify = require('node-spotify-api');
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
      
         case "movie-this":
            getOMDB(userSearch);
            break;
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
      console.log("Name of the venue: " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city);
      console.log("Date of the Event :" + moment(response.data[0].datetime).format('MM/DD/YYYY'));
   })

}
//=======================FUnction to Search OMDB =================================================================
function getOMDB(movie) {
   // var movieName = value;
   var OmdbUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

   axios.get(OmdbUrl).then(function (response) {
      // console.log(response.data); 
      console.log("==================================================")
      console("Title: " + response.data.Title)
      console("Year Released: " + response.data.Year)
      console("IMDB Rating: " + response.data.imdbRating)
      console("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
      console("Country Where Produced: " + response.data.Country)
      console("Language: " + response.data.Language)
      console("Plot: " + response.data.Plot)
      console("Actors: " + response.data.Actors)
   })

}
runLiri(appCommand, userSearch)