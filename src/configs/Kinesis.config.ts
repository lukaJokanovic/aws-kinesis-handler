export class KinesisConfig {
  public static readonly HOST = process.env.KINESIS_HOST || 'http://172.17.0.1';
  public static readonly PORT = process.env.KINESIS_PORT ? parseInt(process.env.KINESIS_PORT, 10) : 4567;
  public static readonly ENDPOINT = `${KinesisConfig.HOST}:${KinesisConfig.PORT}`;
}
