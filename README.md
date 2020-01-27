# Lightning Detector API & Maps

This repository holds lightning detector API, which provides web-based functions
required for [lightning detector](https://github.com/iwaita2ya/LightningDetector-LPC1768),
such as (1) generate unique device ID at device registration, (2) store device location,
(3) store lightning log.

It also provides mapping views for both device location and lightning history, so that user can
visually recognize current status of their devices and latest lightning events plotted on google maps.

You can see actual views of 
[device map](https://lightning-detector.herokuapp.com/map/devices) and 
[lightning logs](https://lightning-detector.herokuapp.com/map/lightnings)
running on [Heroku](https://www.heroku.com).

## Installation

This is a [node](https://nodejs.org) application so please make sure you have set-up node environment, 
and ensure you configured [npm](https://www.npmjs.com/) for installing dependencies.
I currently use node v11.14.0 for development, but I believe it should work v12.x as well

#### Clone & build
`npm install` command will download & install dependencies, so please run the command under Internet connection available.
```bash
$ cd /path/to/project/
$ git clone https://github.com/iwaita2ya/HoverGamesChallenge2019_Lightning-Detector-API-and-Maps.git www
$ cd www
$ npm install # only once
```

#### Database Configuration
This project uses postgres database, and its operation is handled by [Sequelize](https://sequelize.org/) ORM which requires
database configuration file placed at `config/config.json`. Please make sure postgres is up & running on your PC or server
before you run database initialization command.
```bash
# Update database configuration
$ cat config/config.json
{
  "development": {
    "username": "hovergames",
    "password": "hovergames",
    "database": "hovergames",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "hovergames",
    "password": "hovergames",
    "database": "hovergames",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "hovergames",
    "password": "hovergames",
    "database": "hovergames",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
```

Sequelize automates database creation and configuration based on its migration file stored under `migration/` directory.
All you need is simply execute following commands. Sequelize will handle rest of tasks.
```bash
# create database
$ sequelize db:create

# migrate database based on `migration/*.js` files
sequelize db:migrate
```
Official document for Sequelize is [here](https://sequelize.org/v5/manual/getting-started.html).

#### Google Map Key
Since this project uses Google Map (Maps JavaScript API), you need to get API Key. After you get the key, please
place the key in `config/.env.development` file.
```
$ cat config/.env.development 
# Google API Key
GOOGLE_API_KEY="XXXXXXXXXXXXXXXXX"
```
You can get API Key for free, but need a bit of work.

Official documentation for getting API Key is [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Run
Simply hit `npm start` under project root directory and open URL `http://localhost:3000` with preferred browser.
```bash
$ cd /path/to/project/
$ npm start # -> listens at localhost:3000
(Ctrl-D to exit)
```

## API Reference

### Get device Id

Before sending any data, each of lightning detector device must registered itself at API server.
API server will then issue an unique ID (hash) which identifies the device for posting data.

* path: /device/create
* method: POST
* params: (none)

```bash
# Get device unique id from demo server
$ curl -X POST "http://lightning-detector.herokuapp.com/device/create"

{"hash":"16fe7f973fc1aa"}
```
## Post device log
Once you get device id, you can post device location log to API server, which device exists when at where.
When the request succeeded, API server returns JSON data with error code as 0.
* path: /log/device/create
* method: POST
* params: `device`,`lat`,`lon`,`alt`,`loggedAt`
```bash
# Post device log to demo server (assume device is installed at Sapporo, Hokkaido, Japan)
$ curl -X POST --data "device=16fe7f973fc1aa&lat=43.064170&lon=141.346950&alt=29&loggedAt=2020-01-01 00:00:00" "http://lightning-detector.herokuapp.com/log/device/create"

{"error":0}
```
## Read device logs
You can get list of device log to make sure your device is up & running.
* path: /log/device/read
* method: POST
* params: (none)
```bash
# Get latest devices from demo server (latest 10 logs)
$ curl -X POST http://lightning-detector.herokuapp.com/log/device/read

[{"id":1023,"device":"16fe7f973fc1aa","geo":{"type":"Point","coordinates":[43.06417,141.34695,29]},"loggedAt":"2020-01-01T00:00:00.000Z"},...]
```
## Display devices on Google Map
API server is capable of plotting registered devices on Google Map. It shows each device based on its latest log.

Demo:
[https://lightning-detector.herokuapp.com/map/devices](https://lightning-detector.herokuapp.com/map/devices)

![ScreenShot](https://github.com/iwaita2ya/ImageStore/blob/master/hovergame-challenge-2019-sample-device-map.png)

## Post lightning log
Similar to device log, you can post log of lightnings detected by lightning-detector.
When the request succeeded, API server returns JSON data with error code as 0.
* path: /log/device/create
* method: POST
* params: `device`,`lat`,`lon`,`alt`,`type`,`energy`,`distance`,`loggedAt`
```bash
# Post device lightning log to demo server
$ curl -X POST --data "device=16fe7f973fc1aa&lat=43.064170&lon=141.346950&alt=29&type=0&energy=100&distance=1600&loggedAt=2020-01-01 00:00:00" http://lightning-detector.herokuapp.com/log/lightning/create

{"error":0}
```

## Read lightning logs
Similar to device log, You can get list of lightning log from API server.
* path: /log/device/read
* method: POST
* params: (none)
```bash
# Get lightning logs from demo server (latest 100 logs)
$ curl -X POST http://lightning-detector.herokuapp.com/log/lightning/read

[{"id":4,"device":"16fe7f973fc1aa","geo":{"type":"Point","coordinates":[43.06417,141.34695,29]},"interrupt_type":0,"energy":100,"distance":1600,"loggedAt":"2020-01-01T00:00:00.000Z"},...]
```
## Display lightning logs on Google Map
Similarly, API server is capable of plotting lightnings on Google Map. Red circle around the location shows the estimated
distance of lightning from the device. If multiple lightning logged at the same timestamp at close range, it is highly possible
that a lightning has been occurred where the distance circles crossing.

![ScreenShot](https://github.com/iwaita2ya/ImageStore/blob/master/hovergame-challenge-2019-sample-lightning-map.png)