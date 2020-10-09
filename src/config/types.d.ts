export type TErrorConfiguration = 'info' | 'error' | 'warn' | 'debug';

export interface IConfiguration {
  log: {
    level: TErrorConfiguration;
  };
  nodeEnv: 'production' | 'development';
  application: {
    port: string;
  };
}
