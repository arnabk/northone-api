const faker = require('faker');
const moment = require('moment');

const status = ['Open', 'InProgress', 'Blocked', 'Done'];

const tasks = [
  {
    id: '5f7ffe48883f412acca2c03d',
  },
  {
    id: '5f7ffe49883f412acca2c109',
  },
  {
    id: '5f7ffe49883f412acca2c184',
  },
  {
    id: '5f7ffe4d883f412acca2c7d1',
  },
  {
    id: '5f7ffe49883f412acca2c159',
  },
  {
    id: '5f7ffe4a883f412acca2c229',
  },
  {
    id: '5f7ffe4e883f412acca2c971',
  },
  {
    id: '5f7ffe4e883f412acca2c886',
  },
  {
    id: '5f7ffe4b883f412acca2c383',
  },
  {
    id: '5f7ffe4a883f412acca2c27d',
  },
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
        category: Array(3)
          .fill(null)
          .map(_ => faker.commerce.product()),
        status: status[faker.random.number(3)],
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
        status: status[faker.random.number(3)],
      },
    };

    // continue with executing the scenario:
    return done();
  },
};
