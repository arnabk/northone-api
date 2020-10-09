import { IConfiguration } from './types';

const isDevelopment = process.env.NODE_ENV === 'development';

const config: IConfiguration = {
  log: {
    level: isDevelopment ? 'debug' : 'info',
  },
  nodeEnv: isDevelopment ? 'development' : 'production',
  application: {
    port: process.env.PORT || '3000',
  },
};

export default config;
