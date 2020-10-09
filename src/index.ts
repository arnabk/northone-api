// Do not reorder imports
import 'module-alias/register';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import os from 'os';
import typeDefs from './common/AllSchemas';
import resolvers from '@root/resolvers';
import { IDataSources } from '@root/types';
import dataSources from '@root/data-sources';
import onError from '@root/startup/OnError';
import onListening from '@root/startup/OnListening';
import routes from '@root/routes';
import appConfig from '@root/config';
import { logInfo } from '@root/log';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
routes(app);

const apolloServer = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  introspection: true,
  debug: appConfig.nodeEnv !== 'production',
  playground: true,
  dataSources: (): DataSources<IDataSources> => ({ ...dataSources }),
});
apolloServer.applyMiddleware({ app, cors: true });

app.set('port', appConfig.application.port);
const server = http.createServer(app);
apolloServer.installSubscriptionHandlers(server);
server.on('error', onError(appConfig.application.port));
server.on('listening', onListening(server));

(async () => {
  logInfo('Starting application server');
  logInfo('Environment -', appConfig.nodeEnv);
  logInfo('Application port -', appConfig.application.port);
  server.listen(appConfig.application.port);
  logInfo(
    `🚀 Server is ready @ http://${os.hostname()}:${appConfig?.application?.port}${
      apolloServer.graphqlPath
    }`,
  );
})();
