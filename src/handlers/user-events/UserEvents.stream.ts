import { ObjectSchema } from 'joi';
import { IKinesisService } from '../../services/external/Kinesis.service';
import logger from '../../services/external/Logger.service';
import { StreamHandler } from '../StreamHandler';
import { EventType, IUserEventsMessage, userEventsSchema } from './IUserEvents.message';
import { IUserLimit, userLimitCreatedSchema } from './types/IUserLimit';
import { KinesisConfig } from '../../configs/Kinesis.config';
import { IResetUserLimit, userLimitResetPayloadSchema } from './types/IResetUserLimit';
import { IChangeProgressUserLimit, userLimitProgressChangedSchema } from './types/IChangeProgressUserLimit';

export class UserEventsHandler extends StreamHandler<IUserEventsMessage> {
  public schema: ObjectSchema<any> = userEventsSchema;
  constructor(_kinesisService: IKinesisService) {
    super(KinesisConfig.USER_EVENTS_STREAM, _kinesisService);
  }
  public async handleStream(message: IUserEventsMessage): Promise<void> {
    switch (message.type) {
      case EventType.USER_LIMIT_CREATED:
        await this.handleUserLimitCreated(message.payload);
        return;
      case EventType.USER_LIMIT_PROGRESS_CHANGED:
        await this.handleUserLimitProgressChanged(message.payload);
        return;
      case EventType.USER_LIMIT_RESET:
        await this.handleUserLimitReset(message.payload);
        return;
      default:
        throw Error('not implemented');
    }
  }

  private async handleUserLimitCreated(data: IUserLimit): Promise<void> {
    this.validate(data, userLimitCreatedSchema);
    logger.info('Hello from handleUserLimitCreated', { data });
  }

  private async handleUserLimitReset(data: IResetUserLimit): Promise<void> {
    this.validate(data, userLimitResetPayloadSchema);
    logger.info('Hello from handleUserLimitReset', { data });
  }

  private async handleUserLimitProgressChanged(data: IChangeProgressUserLimit): Promise<void> {
    this.validate(data, userLimitProgressChangedSchema);
    logger.info('Hello from handleUserLimitProgressChanged', { data });
  }
}
