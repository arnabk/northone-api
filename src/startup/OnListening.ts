import db from '@root/data-sources/Mongo';
import { logDebug, logInfo } from '@root/log';
import { Server } from 'http';

const listening = (server: Server) => () => {
  const addr = server.address();
  if (addr) {
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logDebug('Listening on ' + bind);
  } else {
    logDebug('Unable to create address');
  }

  process.on('SIGTERM', () => {
    logInfo('SIGTERM signal received.');
    server.close(() => {
      logInfo('Express server closed');
      db.close(true, () => {
        logInfo('Mongo connection closed');
        process.exit(0);
      });
    });
  });
};

export default listening;
