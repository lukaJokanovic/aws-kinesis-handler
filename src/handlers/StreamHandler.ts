import Joi from 'joi';
import { IKinesisService } from '../services/external/Kinesis.service';
import logger from '../services/external/Logger.service';

export abstract class StreamHandler<T> {
  public abstract schema: Joi.ObjectSchema;
  constructor(public streamName: string, protected _kinesisService: IKinesisService) {}

  public async subscribe(): Promise<void> {
    try {
      await this._kinesisService.subscribe(this.streamName, this.subscribeToStream.bind(this));
    } catch (error) {
      logger.error('Failed to subscribe to stream', { error });
    }
  }

  protected validate(data: object, schema: Joi.ObjectSchema): any {
    const { value, error } = schema.validate(data);
    if (error) {
      throw error;
    }

    return value;
  }

  private async subscribeToStream(data: object): Promise<void> {
    try {
      const value = this.validate(data, this.schema);

      const start = Date.now();
      await this.handleStream(value);
      const duration = Date.now() - start;

      logger.info('Message handled', { duration, data });
    } catch (error) {
      logger.error('failed to handle message', { error, data });
    }
  }

  public abstract handleStream(data: T): Promise<void>;
}
