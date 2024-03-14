import { ObjectSchema } from 'joi';
import { IKinesisService } from '../../services/external/Kinesis.service';
import { StreamHandler } from '../StreamHandler';
import { EventType, IUserEventsMessage, userEventsSchema } from './IUserEvents.message';
import { IUserLimit, userLimitCreatedSchema } from './types/IUserLimit';
import { KinesisConfig } from '../../configs/Kinesis.config';
import { IResetUserLimit, userLimitResetPayloadSchema } from './types/IResetUserLimit';
import { IChangeProgressUserLimit, userLimitProgressChangedSchema } from './types/IChangeProgressUserLimit';
import { IUserLimitRepository } from '../../repositories/user-limit/IUserLimit.repository';
import { METHOD_NOT_IMPLEMENTED } from '../../constants/errors';

export class UserEventsHandler extends StreamHandler<IUserEventsMessage> {
  public schema: ObjectSchema<any> = userEventsSchema;
  private _userLimitRepository: IUserLimitRepository;

  constructor(_kinesisService: IKinesisService, userLimitRepository: IUserLimitRepository) {
    super(KinesisConfig.USER_EVENTS_STREAM, _kinesisService);
    this._userLimitRepository = userLimitRepository;
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
        throw METHOD_NOT_IMPLEMENTED;
    }
  }

  private async handleUserLimitCreated(userLimit: IUserLimit): Promise<void> {
    this.validate(userLimit, userLimitCreatedSchema);
    await this._userLimitRepository.save(userLimit);
  }

  private async handleUserLimitReset(data: IResetUserLimit): Promise<void> {
    this.validate(data, userLimitResetPayloadSchema);
    await this._userLimitRepository.reset(data.userLimitId, data.resetAmount, data.nextResetTime);
  }

  private async handleUserLimitProgressChanged(data: IChangeProgressUserLimit): Promise<void> {
    this.validate(data, userLimitProgressChangedSchema);
    await this._userLimitRepository.update(data.userLimitId, data.amount);
  }
}
