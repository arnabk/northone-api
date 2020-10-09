const faker = require("faker");
const moment = require('moment');

const status = [
  "Open", "InProgress", "Blocked", "Done"
];

const tasks = [
  {
    "id": "5f7fe485f12a642387472335"
  },
  {
    "id": "5f7fe483f12a642387472294"
  },
  {
    "id": "5f7fe485f12a64238747233f"
  },
  {
    "id": "5f7fe488f12a642387472895"
  },
  {
    "id": "5f7fe486f12a642387472436"
  },
  {
    "id": "5f7fe3fdf12a642387472035"
  },
  {
    "id": "5f7fe488f12a642387472912"
  },
  {
    "id": "5f7fe48af12a642387472de5"
  },
  {
    "id": "5f7fe486f12a64238747243f"
  },
  {
    "id": "5f7fe485f12a642387472413"
  },
  {
    "id": "5f7fe3fdf12a642387472173"
  },
  {
    "id": "5f7fe3fbf12a642387471ca4"
  },
  {
    "id": "5f7fe3fdf12a642387472081"
  },
  {
    "id": "5f7fe48af12a642387472e02"
  },
  {
    "id": "5f7fe484f12a6423874722e6"
  },
  {
    "id": "5f7fe3faf12a6423874719d8"
  },
  {
    "id": "5f7fe3fcf12a642387471e62"
  },
  {
    "id": "5f7fe486f12a6423874724af"
  },
  {
    "id": "5f7fe3faf12a64238747191c"
  },
  {
    "id": "5f7fe487f12a6423874726cd"
  }
];

module.exports = {
  generateTask: function (context, events, done) {
    // add variables to virtual user's context:
    context.vars.data = {
      request: {
        user: faker.name.firstName(),
        email: faker.internet.email(),
        title: faker.name.title(),
        description: faker.lorem.sentence(50),
        dueDate: faker.date.between(moment().toDate(), moment().add(100, 'days').toDate()),
        category: Array(3).fill(null).map(_ => faker.commerce.product()),
        status: status[faker.random.number(3)]
      },
    };
    // continue with executing the scenario:
    return done();
  },
  generateSubTask: function (context, events, done) {
    // add variables to virtual user's context:
    context.vars.data = {
      request: {
        taskId: tasks[faker.random.number(tasks.length - 1)].id,
        title: faker.name.title(),
        description: faker.lorem.sentence(50),
        dueDate: faker.date.between(moment().toDate(), moment().add(100, 'days').toDate()),
        status: status[faker.random.number(3)]
      },
    };

    // continue with executing the scenario:
    return done();
  },
};
