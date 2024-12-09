# Transport Manager

This repository contains a work-in-progress ExpressJS server and TypeScript React web application providing users with an interactive map and dashboard synchronizing with their locally running instance of Open Transport Tycoon, an open-source game where players are tasked with running a cargo and passenger transport company. 

The server functions by connecting to OpenTTD's Admin Port with a TCP socket connection, both sending and receiving packets over this connection. Transmission of in-depth game data, such as map state and economy data, is enabled through a custom made in-game gamescript. A local PostgreSQL database is used to store game data and is made available using an ExpressJS server. The web application provides users with a dashboard that allows them to view, edit, and save details about their local game.

A preview build of the website is available at https://transport-manager-ttd.vercel.app/. The preview build only demos a pre-loaded dataset, since socket functionalities are disabled.

## Features

The current iteration supports:
- a RESTful API enabling the extraction, storage and retrieval of in-game data pertaining to:
    - map data (dimensions, seed, etc.)
    - industries (locations, accepted and produced cargos, monthly production rates, names)
    - companies (names, quarterly profit, quarterly units transported, etc.)
    - towns (locations, names, population)
    - cargoes (names, labels, classification classes)
    - stations (locations, names, accepted transport modes, etc.)
- A web application centered around an interactive map which includes:
    - labels for the in-game data mentioned above
    - a click and drag distance measuring tool
    - ability to annotate the map with signs, circles and diamonds for notes and distance estimates
    - directories which list all towns and industries on the map
    - a icon filter by industry type, icon type, station types
    - actions to add, edit or delete towns, industries, and stations

The repo is currently still a work-in-progress, with only one in-game economy supported (FIRS 4.15 Steeltown) which is used for basic testing.

## Installation

Before installation, you will need to have these on your system:
- Git (https://git-scm.com/)
- Node.js + NPM (https://nodejs.org/en/)
- Typescript (https://www.typescriptlang.org/)
- PostgreSQL (https://www.postgresql.org/)
- OpenTTD (https://github.com/OpenTTD/OpenTTD)

Then clone the repository.

### Database setup

Create a new PostgreSQL database for the server. 

If you are new to PostgreSQL, the easiest way to do so is with pgAdmin. Start it, and create a database. The following settings are recommended:
- user name: postgres
- database name: openttd_server
- db password: <any password you want>

Remember these settings, as you'll need them later.

### Setup credentials

You will need to setup password credentials to your database and running instance of OpenTTD. `.env` files. This will allow the server to connect to OpenTTD to get your game data, and then store it in your locally running database to store your game data.

For the server to connect your running instance of OpenTTD, you will need to change `.env` to match the passwords and settings configured for your game.

Setup the following values in `./server/.env`, replacing the values between the `<>` using the corresponding settings from `openttd.cfg` file that comes with your OpenTTD install. On Windows, this file is typically located at `C:\Documents\OpenTTD\openttd.cfg`.
```
OPENTTD_SERVER_IP = 127.0.0.1
OPENTTD_SERVER_PORT = <server_port>
OPENTTD_SERVER_ADMIN_PORT = <server_admin_port>
OPENTTD_SERVER_PASSWORD = <server_password>
OPENTTD_SERVER_ADMIN_PASSWORD = <admin_password>
```

In the same file (`./server/.env`), change the following settings or leave them as default:
```
SERVER_HOST = localhost
SERVER_PORT = 3000
BOT_NAME = CargoExpressBot
VERSION = 1.0
```

In the same file `./server/.env`, also set up the connection settings to the database.
```
DB_HOST = localhost
DB_PASSWORD = <your db password>
DB_PORT = 5432
DB_NAME = openttd_server
DB_USER = postgres
```

In the `./shared/.env` file, add the same settings for the DB as above. 
```
DB_HOST = localhost
DB_PASSWORD = <your db password>
DB_PORT = 5432
DB_NAME = openttd_server
DB_USER = postgres
```

### Run the migrations

To perform initial setup into your database to enable it to store the data we need, open the terminal and run:
```
cd shared
npm run db:generate
npm run db:migrate
```

### Start the server

To run the server run this in the terminal. Your server will start running at [http://localhost:3000](http://localhost:3000), assuming your SERVER_HOST was set to `localhost` and SERVER_PORT was set to `3000`.
```
cd server
npm run dev
```

If you want to stop the server, press `Ctrl + C`. If prompted to terminate batch job, agree by entering `Y`. It can be started again with `npm run dev`.

Now, the server by itself doesn't do much. There is not a web interface and it has not connect to your game yet. So let's continue!

### Start the web app

Run the following in another terminal:
```
cd cargo-app
npm run dev
```

The web app can now be accessed at [http://[::1]:5173](http://[::1]:5173) in your browser. It might take a minute or two to load.

### Connect to OpenTTD

The following will guide you through how to have the server connect to OpenTTD. Note that connection is only possible for multiplayer games. To play singleplayer or load your existing singleplayer saves, there is also a section for that.

#### Install the custom gamescript

The custom gamescript is found in this repository in the `./script` folder. This was created using the [Minimal GS boilerplate from Zuu](https://www.tt-forums.net/viewtopic.php?t=62163).

Copy the `script` folder into your OpenTTD Gamescript folder to get started. By default, this folder on Windows is at `C:\Users\MyUser\Documents\OpenTTD\game\library`. Name the folder something descriptive like `Transport Manager Server Gamescript`.

Start your OpenTTD, and make a new **multiplayer** game with the script active. If you want to use an existing singleplayer save, read the next section, [Using existing saves](#using-existing-saves). Else, skip to [Initiate the connection](#initiate-the-connection).

#### Using existing saves

**Singleplayer games cannot be connected to**, because they do not run the server admin port that is needed. You can still play "singleplayer" by starting up a multiplayer on your local network and password-protected so no one else can connect to it.

To use an existing save you will need to activate the GameScript in the scenario editor. **Note that changing gamescripts this way is not officially supported, and can break your save game and your game installation. So proceed at your own risk, and make a backup copy of the save file before starting!**:

1. Find the save file in your OpenTTD save folder. Change the save file to scenario (Change file extension from `.sav` -> `.scn`).
2. Opening the file in OpenTTD scenario editor. Under AI/Script Settings, add the custom gamescript, and save the scenario. Exit the scenario editor.
3. Rename the newly saved scenario file back to save file (Change file extension from `.scn` back to `.sav`).

#### Initiate the connection

In the web app, click on `Saves` in the top left menu. Then click `Connect` at the bottom of the screen. If successful, you will see a green success message in the notifications on the right side of the screen. If you see a red message, it means that the server was unable to connect to OpenTTD. To troubleshoot this, double check that the settings you gave for the `.env` files match with OpenTTD, and that OpenTTD is open and already running your multiplayer game. Then, click `Connect` again.

### Populate the server and web app with your game data

To actually have your game data loaded into the server and web app, you will need press the appropriate update request buttons on the `Saves` page. 

When pressed, it will send a request to the GameScript to start transferring the data over. Once it is done, you will receive a success message in the notifications on the right side of the screen. Once stations, towns, or industries have loaded in, you will see them as icons on the screen.

### Change the map background

The default background shown in the web app is a blank screen, which matches the dimensions of the save if one is currently loaded. It is highly recommended that you replace this background with a top-down image of your map. This image can be loaded in by clicking the `Upload Map Image` in the bottom right of the screen, `Browse` to select your image, and then `Upload`.

This image can be most easily generated by using JGR's Patch Pack (JGRPP). This patch overhaul of the base game adds additional top-down screenshot options to OpenTTD, accessible in-game with `?` > `Screenshot` in the top right menu. Use one of `Heightmap screenshot`, `Minimap screenshot`, `Topography screenshot` or `Industry screenshot` based on your preferences.


## Credits and Resources

The custom gamescript is a modification of the boilerplate [Zuu on the OpenTTD forums](https://www.tt-forums.net/viewtopic.php?t=62163).

GameScript documentation for OpenTTD is available at [here](https://docs.openttd.org/gs-api/annotated).

The idea for the Express server was initially inspired by the work of another user (https://github.com/erico252/Train-Game-Admin). Their implementation of packet reading served as a starting point, but eventually was entirely rewritten for better modularity, reusability, and readability. Bugs were also fixed, and new functionality was added to allow for multiple companies, save games, etc.







