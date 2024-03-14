import { ServiceConfig } from './configs/Service.config';
import { METHOD_NOT_IMPLEMENTED } from './constants/errors';
import { UserEventsHandler } from './handlers/user-events/UserEvents.handler';
import { IUserLimitRepository } from './repositories/user-limit/IUserLimit.repository';
import { UserLimitInMemoryRepository } from './repositories/user-limit/UserLimitInMemory.repository';
import { KinesisService } from './services/external/Kinesis.service';
import logger from './services/external/Logger.service';

export async function bootstrap(): Promise<void> {
  let userLimitRepository: IUserLimitRepository;

  if (ServiceConfig.DB_IN_MEMORY) {
    userLimitRepository = new UserLimitInMemoryRepository();
  } else {
    throw METHOD_NOT_IMPLEMENTED;
  }

  const kinesisService = new KinesisService();

  const userEventsHandler = new UserEventsHandler(kinesisService, userLimitRepository);

  await userEventsHandler.subscribe();

  logger.info('Service up and running...');
}
