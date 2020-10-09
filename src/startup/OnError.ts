import { logError } from '@root/log';
import { IApplicationError } from '@root/types';

const onError = (applicationPort: string | number | boolean) => (error: IApplicationError) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof applicationPort === 'string' ? 'Pipe ' + applicationPort : 'Port ' + applicationPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logError(bind, 'requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logError(bind, 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export default onError;
