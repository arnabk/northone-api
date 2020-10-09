# northone-api [![Actions Status](https://github.com/arnabk/northone-api/workflows/northone-api/badge.svg)](https://github.com/arnabk/northone-api/actions)

GraphQL project

## Pre-requisite

    node -v
    yarn -v

    # optional, needed if using artillery to generate data
    artillery

    # optional, needed if you want to configure remote Linode instance
    terraform

    # optional, needed if you want to run everything in docker
    docker
    docker-compose

## Project details

- This project uses [Github actions](https://github.com/arnabk/northone-api/actions)
- A copy of the application is already deployed [here](http://198.74.58.229:3000/graphql) using [terraform](./terraform). This is a GraphQL playground.
- Following endpoints are available
  - `addTask` - To add a new task
  - `updateTask` - To update a task
  - `removeTask` - To delete a task
  - `totalTask` - Total number of tasks
  - `listTask` - Pulls paginated task list. Supports multiple criterias with sorting
  - `addSubTask` - Add a subtask in task
  - `updateSubTask` - Update a subtask in task
  - `removeSubTask` - Delete a subtask in task
  - `totalSubTask` - Total number of sub-tasks in a task
  - `listSubTask` - Pulls paginated sub-task list. Supports multiple criterias with sorting
- [Artillery](./artillery) can be used to generate random data
- `yarn start` will start development server, however it expects a mongo instance running locally with port `27017` and host name `mongo` point to `localhost`

## Code structure

- [schemas](./src/schemas) has all the GQL schemas used in this project
- [resolvers](./src/resolvers) has all the resolvers corresponding to the schemas used
- [log](./src/log) - The project is using winston framework for logging
- [data-sources](./src/data-sources) - Mongo/Mongoose data models and Apollo GraphQL data sources


## Command to gets the project started

Any one of the following methods could be used to start using the application

- Access deployed env [here](http://198.74.58.229:3000/graphql). Already have some seed data to get started
- Use docker compose

        docker-compose build
        docker-compose up

        # The project will be running at http://localhost:3000/graphql

- Use local env

        docker run -d -p 27017:27017 mongo

        # Edit /etc/hosts and add following line
        127.0.0.1 mongo

        # From project directory
        yarn install
        yarn start

        # The project will be running at http://localhost:3000/graphql

## Enhancement consideration for future

- Sharing a list
- Creating workspace/group/boards
- Versioning
- Implementing RBAC to allow others to edit/comment
- Email reminders
- Authentication
- File upload
