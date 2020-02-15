//Adds the code to read and set enviorment variables with dotenv package
require("dotenv").config();
//Adds the code required to import the key.js file and store it in a variable
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");

//Captures the Variables for the search items to be entered by the user
//Captures the command for part of the switch statement will run
var appCommand = process.argv[2];
console.log("App Command is: " + appCommand);
//Captures the item they are searching for
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
         getSpotify(userSearch);
         break;

      case "do-what-it-says":
         getRead();
         break;
         //If user doesn't enter anything
         default:
         console.log("YO! Buttercup! Enter one of the following PHRASES! concert-this, spotify-this-song, or movie-this! ")

   }

}

//========================Function to search Bands In Town=================================================
function getBandsInTown(artist) {

   var artist = userSearch;
   var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

   axios.get(bandsInTownUrl).then(function (response) {
      //console.log(response.data)
      console.log("****************************************************");
      console.log("Name of the Band: " + userSearch + "\r\n")
      console.log("Name of the Venue: " +response.data[0].venue.name+"\r\n");
      console.log("Venue location: " + response.data[0].venue.city + "\r\n");
      console.log("Date of the Event :" + moment(response.data[0].datetime).format('MM/DD/YYYY') + "\r\n");

   //Appends the search results to a text file name "log"
   var logConcert = ("*****Bands In Town Log Entry*****" + 
   "\nMusician - " + userSearch + 
   "\nVenue - " + response.data[0].venue.name + 
   "\nDate -" + moment(response.data[0].datetime).format('MM/DD/YYYY')+ "\n" + "\r\n");
      fs.appendFile("log.txt", logConcert, function (err){
      if(err) throw err
});

   })
}
//=========================FUnciton to Search OMDB======================================
function getOMDB(movie) {

   var OmdbUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

   axios.get(OmdbUrl).then(function (response) {
      //console.log(response.data); 
      console.log("==================================================")
      console.log("Movie Title: " + response.data.Title + "\r\n")
      console.log("Year Released: " + response.data.Year + "\r\n")
      console.log("IMDB Rating: " + response.data.imdbRating + "\r\n")
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n")
      console.log("Country Where Produced: " + response.data.Country + "\r\n")
      console.log("Language: " + response.data.Language + "\r\n")
      console.log("Plot: " + response.data.Plot + "\r\n")
      console.log("Actors: " + response.data.Actors + "\r\n")
      //Appends the search results to a text file name "log"
      var logMovie = ("***** OMDB Entry *****"  + 
      "\nMovie - " + response.data.Title +
      "\nReleased: " + response.data.Year+ 
      "\nRating: " + response.data.imdbRating +
      "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
      "\nCountry Where Produced: " + response.data.Country +
      "\nLanguage: " + response.data.Language+ 
      "\nPlot: " + response.data.Plot +
      "\nActors: " + response.data.Actors +"\n" +"\r\n")

         fs.appendFile("log.txt", logMovie, function (err){
         if(err) throw err
});

   })
}
//=============Get Spotify Songs and Information================================================================
function getSpotify(songName) {

   var spotify = new Spotify(keys.spotify)
  // console.log("Spotify Key: " + spotify);

  //HA-HA, I'm sorry. I just couldn't bring myself to put "The Sign"
  if(!songName){
     songName ="Overkill";
  }

   spotify.search({type:'track', query: songName}, function (err, data) {
       if (err) {
           return console.log('Error occurred: ' + err);
       }

       console.log("***************************************************************")
       //console.log("Data.Tracks.items is " + JSON.stringify(data.tracks.items[0]))

       console.log("Song Searched For: " + userSearch+"\r\n");
       console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name + "\r\n")
       console.log("Album Name: ", data.tracks.items[0].album.name + "\r\n")
       console.log("Relase Date: ", data.tracks.items[0].album.release_date +"\r\n")
       console.log("Preview Link: ", data.tracks.items[0].preview_url+ "\r\n")

       //Appends the search results to a text file name "log"
       var logSong = ("***** Spotify Log Entry *****" + 
       "\nSong: " + userSearch +
       "\nArtist: - " + data.tracks.items[0].album.artists[0].name +
       "\nAlbum Name: "+ data.tracks.items[0].album.name +
       "\mRelase Date: "+ data.tracks.items[0].album.release_date+
       "\nPreview Link: " +data.tracks.items[0].preview_url+"\n" +"\r\n");
       fs.appendFile("log.txt", logSong, function (err){
          if(err) throw err
       });

      });


//=============Random Spotify Songs and Information=================================//
function getRead() {
   fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
    
      // We will then print the contents of data
      console.log(data);
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
    
      // We will then re-display the content as an array for later use.
      console.log(dataArr);
    
       });
   };
}


runLiri(appCommand, userSearch);