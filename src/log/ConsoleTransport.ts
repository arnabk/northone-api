import winston, { format } from 'winston';

const { combine, timestamp, align, printf, colorize } = format;

export default () =>
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      align(),
      printf(info => {
        const { timestamp, level, message, ...args } = info;
        const ts = timestamp.replace(/T|Z/gi, ' ').trim();
        return `${ts} [${level}]: ${message} ${
          Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
        }`;
      }),
    ),
  });
