import Joi, { ValidationResult } from "joi";
import { IKinesisService } from "../services/external/Kinesis.service";
import logger from "../services/external/Logger.service";

export abstract class StreamHandler<T> {
  public abstract schema: Joi.ObjectSchema;
  constructor(public streamName: string, protected _kinesisService: IKinesisService) {}

  public async subscribe(): Promise<void> {
    try {
      await this._kinesisService.subscribe(this.streamName, this.subscribeToStream.bind(this));
    } catch (error) {
      logger.error('Failed to subscribe to stream', {error});
    }
  }

  private async subscribeToStream(message: string): Promise<void> {
    try {
      const { value, error } = this.validateMessage(message);
      if (error) {
        logger.error('Joi Validation failed', {error});
        return;
      }

        const start = Date.now();
        await this.handleStream(value);
        const duration = Date.now() - start;

        logger.info('Message handled',{duration});
    } catch (error) {
        logger.error('failed to handle message',{error})
    }
  }


  private validateMessage(message: string): ValidationResult {
    const parsedMessage = JSON.parse(message);

    return this.schema.validate(parsedMessage);
  }

  public abstract handleStream(message: T): Promise<void>;
}
