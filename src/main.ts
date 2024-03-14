import { bootstrap } from './bootstrap';
import logger from './services/external/Logger.service';

process
  .on('unhandledRejection', (error: any) => {
    logger.error(`Unhandled Rejection at Promise`, { error });
  })
  .on('uncaughtException', (error: any) => {
    logger.error(`Uncaught Exception thrown`, { error });
    process.exit(1);
  });

bootstrap();
