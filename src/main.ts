import logger from "./services/external/Logger.service";

process
.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled Rejection at Promise | ${err.message}`, { stack: err.stack });
})
.on('uncaughtException', (err: any) => {
  logger.error(`Uncaught Exception thrown | ${err.message}`, { stack: err.stack });
  process.exit(1);
});

logger.debug('test debug');
logger.info('hello info');
logger.error('test error');
logger.warn('test warn');