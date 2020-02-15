# liri-node-app

The Liri-Node-App was designed to be multi use entertainment and information application to return search resuls on Movies from OMDB, Songs from Spotify and Concerts from Bands in Town.

The code in liri.js is organized in distinct sections and grouped together according to what the app is going at any given moment.
Lines 1 - 9 are grouping and setting varaibles for all the required packages and files.

LInes 10-16 sets up variables to direct and capture the user's input.

Lines 18-42 ia function that will run the program and take the user command and input and run it  through the function until it hits the applicable command.  If no command is found, it will prompt the user to input a command.

Lines 44-68 is the Bands In Town search criteria. Axios creates a call and returns a data array that is then constructed with console.log's to access the relevant information.  This return is shown to the user and also saved in a log.text file.

Lines 70-101 is the OMDB search criteria. Axios creates a call and returns a data array that is then constructed with console.log's to access the relevant information.  This return is shown to the user and also saved in a log.text file.

Lines 102-138 is the Spotify search criteria. Spotify creates a call and returns a data array that is then constructed with console.log's to access the relevant information.  This return is shown to the user and also saved in a log.text file.
