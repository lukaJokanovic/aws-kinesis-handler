import { Kinesis, PutRecordInput, ShardIteratorType } from '@aws-sdk/client-kinesis';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';
import { KinesisConfig } from '../../configs/Kinesis.config';
import logger from './Logger.service';

export interface IKinesisService {
  publish(stream: string, data: any): Promise<void>;
  subscribe(streamName: string, cb: (data: any) => Promise<void>): Promise<void>;
}

export class KinesisService implements IKinesisService {
  private _kinesis: Kinesis;

  constructor() {
    this._kinesis = new Kinesis({
      endpoint: KinesisConfig.ENDPOINT,
      region: KinesisConfig.REGION,
      credentials: {
        accessKeyId: KinesisConfig.ACCESS_KEY_ID,
        secretAccessKey: KinesisConfig.SECRET_ACCESS_KEY,
      },
      // https://github.com/aws/aws-sdk-js-v3/issues/3809
      requestHandler: new NodeHttpHandler() as any,
    });
  }

  public async publish(stream: string, data: any): Promise<void> {
    const params: PutRecordInput = {
      StreamName: stream,
      Data: new TextEncoder().encode(JSON.stringify(data)),
      PartitionKey: '1',
    };
    try {
      await this._kinesis.putRecord(params);
      logger.info('Record published', { data, stream });
    } catch (error) {
      logger.info('Failed to publish record', { data, stream });
    }
  }

  public async subscribe(streamName: string, cb: (data: any) => Promise<void>): Promise<void> {
    const iteratorParams = {
      ShardId: 'shardId-000000000000', // first shard
      ShardIteratorType: ShardIteratorType.LATEST, // Start from the latest record in the stream
      StreamName: streamName,
    };

    this._kinesis.getShardIterator(iteratorParams, (error: any, data: any) => {
      if (error) {
        throw error;
      }

      const shardIterator = data.ShardIterator;

      // Continuously get records from the shard
      const getRecordsParams = {
        ShardIterator: shardIterator,
      };

      setInterval(() => {
        this._kinesis.getRecords(getRecordsParams, async (error: any, data: any) => {
          if (error) {
            throw error;
          }

          // Process received records
          for (const record of data.Records) {
            const message = JSON.parse(Buffer.from(record.Data, 'base64').toString('utf-8'));
            await cb(message);
          }

          // Update shard iterator for next request
          getRecordsParams.ShardIterator = data.NextShardIterator;
        });
      }, 1000); // Adjust the interval as per requirement
    });
  }
}
