# Backend

## Setup

You will need [docker](https://www.docker.com) and [just](https://github.com/casey/just) to work on this repository. Go install them if they are not already. The server is running in a docker container with volumes mapped to the directories `
./src` and `./prisma`, which means that you can develop directly inside the source folder and see the changes automatically in the container.

## How to use

_Tips:_ to see the list of recipes, type `just -l`.

To bootstrap the project run the command `just`. It will setup the docker environment (app + database + web interface) and run the prisma migrations on the database.

The following workflows are available:

- To start the docker environment, type `just up` (add `-d` to start in detached mode). To stop it, run `just down`.
- To see live logs of a service, run `just logs <service>` where service is one of the following: `api`, `database` (add a `-f` flag to keep the logs open).
- To execute a command in a container, type `just exec <service> <command>`.
- To open a shell in a running container, use `just shell <service>` (you can specify an arbitrary shell).
- To open a connection to the database, run `just db`, then enter your password.
- To execute a prisma command in the server, type `just prisma <command>`.
