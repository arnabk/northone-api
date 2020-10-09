# northone-api [![Actions Status](https://github.com/arnabk/northone-api/workflows/northone-api/badge.svg)](https://github.com/arnabk/northone-api/actions)

GraphQL project

## Pre-requisite

    node
    yarn
    # optional, needed if using artillery to generate data
    artillery
    # optional, needed if want to configure remote Linode instance
    terraform
    # optional, needed if want to run everything in docker
    docker
    docker-compose

# Project details

- This project uses Github actions
- A copy of the application is already deployed ![here](http://) using ![terraform](./terraform). This is a GraphQL playground.
- Following endpoints are available
  - `addTask`
  - `updateTask`
  - `deleteTask`
  - `totalTask`
  - `listTask` - Supports multiple criterias with sorting
  - `addSubTask`
  - `updateSubTask`
  - `deleteSubTask`
  - `totalSubTask`
  - `listSubTask` - Supports multiple criterias with sorting
- 
## Enhancement consideration for future

- Sharing a list
- Creating workspace/group/boards
- Versioning
- Implementing RBAC to allow others to edit/comment
- Email reminders
- Authentication
- File upload
