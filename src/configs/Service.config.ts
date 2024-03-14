import { Environment } from '../enums/Environment';

export class ServiceConfig {
  public static readonly NODE_ENV = process.env.NODE_ENV || Environment.Local;
  public static readonly LOG_LEVEL = process.env.LOG_LEVEL || ServiceConfig.isTestEnvironment() ? 'DEBUG' : 'INFO';
  public static readonly SERVICE_NAME = process.env.SERVICE_NAME || 'kinesis-handler';
  public static readonly SERVICE_VERSION = process.env.SERVICE_VERSION || '1.0.0';
  public static readonly DB_IN_MEMORY = Boolean(process.env.DB_IN_MEMORY);

  public static isProductionEnvironment(): boolean {
    return this.NODE_ENV === Environment.Production;
  }

  public static isTestEnvironment(): boolean {
    return this.NODE_ENV === Environment.Test;
  }

  public static isLocalEnvironment(): boolean {
    return this.NODE_ENV === Environment.Local;
  }

  public static isDevEnvironment(): boolean {
    return this.NODE_ENV === Environment.Development;
  }
}
