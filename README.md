# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Intrstng/nodejs2024Q1-service.git
```

## Switch to task branch:

```
git checkout task_part2
```

## Installing NPM modules

```
npm install
```

## If you encounter problems during npm installation:

```
npm install --force
```

## Create env file (.env is moved to .gitignore)
Create .env file (**based on .env.example**)

## Docker

Make sure docker is installed on your system:
- download Docker
- install Docker
- start Docker
- log in to [_Docker hub_](https://hub.docker.com/)


## Building images
1. To build images locally, firstly check that all previously started containers are stopped (port 4000 is free)
2. Run:
```
npm run docker:build
```
3. The app needs some time to start inside the docker container. Wait until container will finish starting process and Nest will complete starting compilation (if you run the tests right away, they will fail). Check docker container starting log in Docker desktop application (usually the startup time does not exceed 30 seconds after the image is created).
4. Start tests

## Tests
If you completed installing of the dependencies, pulling or building the images, and containers are started (docker log of started container is ok), open new terminal and run:
```
npm run test
```

## Stop running container
To stop running container and delete it:
```
npm run docker:down
```

## Stop running container and delete volumes and images
### !!! IMPORTANT !!!
To stop running container and delete ALL volumes and images in your system:
```
npm run docker:clean
```

## Docker Hub

Custom images are stored in Docker Hub (make search by names):
- andreibabich/home_library_service-app
- andreibabich/home_library_service-db


Sometimes search in Docker Hub doesn\`t work for public repo\`s. To find and pull my containers from Docker Hub use these direct links
```
https://hub.docker.com/r/andreibabich/home_library_service-app
```
```
https://hub.docker.com/r/andreibabich/home_library_service-db
```

### Pull the images from Docker Hub

Run in terminal:
```
docker pull andreibabich/home_library_service-app
```
```
docker pull andreibabich/home_library_service-db
```

Start the containers by running:

```
npm run docker:pull
```

Open root folder of the app and start in terminal:

```
npm run test
```


## Vulnerabilities scan
!!! You must be logged in to Docker Hub !!!
Start scripts:

Run docker scout cves:
```
npm run docker:scan
```

Show docker scout recommendations:
```
npm run docker:scan-cves
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
