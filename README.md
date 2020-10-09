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

# Project details

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

## Enhancement consideration for future

- Sharing a list
- Creating workspace/group/boards
- Versioning
- Implementing RBAC to allow others to edit/comment
- Email reminders
- Authentication
- File upload
