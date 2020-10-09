import apiConfig from '@root/config';
import winston from 'winston';
import consoleTransportfn from './ConsoleTransport';

const consoleTransport = consoleTransportfn();

const logger = winston.createLogger({
  level: apiConfig.log.level,
  transports: [consoleTransport],
  exitOnError: false,
  exceptionHandlers: [consoleTransport],
});

type TLogArg = string | number | undefined;
const argsToString = (...args: TLogArg[]) => args.filter(f => f).join(' , ');

export const logInfo = (...args: TLogArg[]) => logger.info(argsToString(...args));
export const logDebug = (...args: TLogArg[]) => logger.debug(argsToString(...args));
export const logError = (...args: TLogArg[]) => logger.error(argsToString(...args));
