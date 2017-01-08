# Getting Started
Follow these steps to get this project up and running.

## Get the Repo
- Download the following zip and extract where desired: https://github.com/WietseSteenmans/Cloud_Applications/archive/master.zip
- git clone https://github.com/WietseSteenmans/Cloud_Applications.git

## Get the Website Up and Running
1. Make sure mongo is installed on your system. Create a new database (default options): mongod --dbpath "location"
2. Run the website inside the "Documentation/Code" folder: node server.js
3. Check if everything is running by opening your browser and going to "localhost:3000".
4. Create some test questions on the website.

## Get the Companion App on Your Android Device
1. Use Android Studio to open the repo folder.
2. Change all the ip addresses you find in "MainMenu.java, QuestionActivity.java and ScanAnswersActivity.java" to the ip address of the machine running the JarFish website.

### Troubleshooting
- Make sure that nothing is blocking communication between the site and the Android app.
