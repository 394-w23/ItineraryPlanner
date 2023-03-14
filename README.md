# Squirrel - Team Blue, COMP_SCI 394 (Winter 2023)

The following repository is a React and Firebase application called Squirrel, a platform where digital nomads can browse locations of interest in their city and create an itinerary optimized for minimum travel time. The app was developed by Team Blue in COMP_SCI 394 (Winter 2023). The deployed site can be found here: https://itineraryplanner-67b24.web.app/. 

## Built with
* React
* Firebase
* Bootstrap
* Google Maps API

## Setting up React and Firebase

### Prerequisites
This React project requires Node.js and Node Package Manager (npm) to install dependencies and run/build the app. To install Node.js, [visit this site](https://nodejs.org/en/download/) and install the appropriate software for your machine. To install npm, run the following command:
```
curl -qL https://www.npmjs.com/install.sh | sh
```
Then, to verify that both Node.js and npm are installed, run the following commands and ensure a version number prints:
```
node -v
npm -v
```
Next, to set up Firebase, [create a Firebase account](https://firebase.google.com/). Then, run
```
firebase login
```
to connect your new Firebase account to the terminal.

### Installation

Clone this repository by running
```
git clone https://github.com/394-w23/ItineraryPlanner.git
```
Then, you'll either need to join the existing Firebase project (by contacting one of the original developers to be added), or create a new one using the [Firebase online portal](https://firebase.google.com/). If you decide to create a new one, follow [these instructions](https://medium.com/swlh/how-to-deploy-a-react-app-with-firebase-hosting-98063c5bf425) to set up hosting and [these instructions](https://courses.cs.northwestern.edu/394/guides/react-examples.php#add-database) to set up the realtime database. For the second set of instructions, you'll have to replace your new project's configuration (which you'll get when creating the project on the Firebase portal) with the old project's configuration in src/utilities/firebase.js. After setting up the realtime database, import the json found in data/data.json within the realtime database section of your project's portal. Finally, run
```
npm i
```
to intsall all the dependencies that are required for the app to run locally, including react-bootstrap.

### Run
To run the app locally, run
```
npm start
```
To run unit tests, run
```
npm run test
```
Finally, to deploy to the online site, run
```
npm run build
firebase deploy
```

## Known bugs in current application
No known bugs in the current application.

## Contact info
* Lucy Beck - lucybeck2024@u.northwestern.edu
* Aziz Ben Abderrahmen - azizbenabderrahmen2024@u.northwestern.edu
* Patrick Hoey - patrickhoey2024@u.northwestern.edu
* Tim Huynh - timhuynh2024@u.northwestern.edu
* Sengdao Inthavong - sengdaointhavong2024@u.northwestern.edu
* Salome Khelashvili - salomekhelashvili2023@u.northwestern.edu
* Isaias Lipa - isaiaslipa2023@u.northwestern.edu
* Karthik Subramanian - karthiksubramanian2024@u.northwestern.edu
