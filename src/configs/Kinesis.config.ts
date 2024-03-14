export class KinesisConfig {
  public static readonly HOST = process.env.KINESIS_HOST || 'http://host.docker.internal';
  public static readonly PORT = process.env.KINESIS_PORT ? parseInt(process.env.KINESIS_PORT, 10) : 4567;
  public static readonly ENDPOINT = `${KinesisConfig.HOST}:${KinesisConfig.PORT}`;
  public static readonly REGION = process.env.KINESIS_REGION || 'eu-west-2';
  public static readonly ACCESS_KEY_ID = process.env.KINESIS_ACCESS_KEY_ID || 'some_id';
  public static readonly SECRET_ACCESS_KEY = process.env.KINESIS_SECRET_ACCESS_KEY || 'some_key';
}
