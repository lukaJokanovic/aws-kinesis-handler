import { Logger } from '@aws-lambda-powertools/logger';
import { ServiceConfig } from '../../configs/Service.config';

export interface ILoggerService {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export class LoggerService implements ILoggerService {
  private _logger: Logger;

  constructor() {
    this._logger = new Logger({ serviceName: ServiceConfig.SERVICE_NAME, logLevel: ServiceConfig.LOG_LEVEL });
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this._logger.debug(message, {meta});
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this._logger.info(message, {meta});
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this._logger.warn(message, {meta});
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this._logger.error(message, {meta});
  }
}

const logger = new LoggerService();
export default logger;
