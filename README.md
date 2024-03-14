# aws-kinesis-handler

This is a simple stream handler that listens for records added to stream.

- [Prerequisites](#prerequisites)
- [Commands](#commands)
- [Answers](#answers)

## Prerequisites

### Docker

Check the official [`Docker documentation`](https://docs.docker.com/engine/) for information how to install Docker on your operating system.

### make

Check the official [`make documentation`](https://www.gnu.org/software/make/) for information how to install make on your operating system.

### docker-compose

All env variables are defined in docker-compose file.

## Commands

1. To test the whole flow there are 4 steps that need to be executed in specified order:
    * `docker-compose up --build kinesalite --detach` this will start up kinesis container
    * `make create-user-stream` this will create user stream
    * `docker-compose up --build app` this will start up app container
    * from another terminal: `make populate-data` this will insert data into kinesis

Note: app will not stay up if user stream does not exist

This Dockerfile base image is a base image for Lambda, so the behavior we will get on the local runs should be the same as the behavior on the cloud.

2. Detailed coverage can be seen with this command: `yarn run coverage`

3. All other commands can be seen in package.json