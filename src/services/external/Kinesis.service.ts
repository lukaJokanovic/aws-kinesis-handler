import { Kinesis, PutRecordInput,ShardIteratorType } from "@aws-sdk/client-kinesis";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { KinesisConfig } from "../../configs/Kinesis.config";
import logger from "./Logger.service";

export class KinesisService{
    private _kinesis: Kinesis;

    constructor(){
        this._kinesis = new Kinesis({
            endpoint: KinesisConfig.ENDPOINT,
            region: KinesisConfig.REGION,
            credentials: {
				accessKeyId: KinesisConfig.ACCESS_KEY_ID,
				secretAccessKey: KinesisConfig.SECRET_ACCESS_KEY,
			},
            // https://github.com/aws/aws-sdk-js-v3/issues/3809
			requestHandler: new NodeHttpHandler() as any
        });
    }

    public async publish(stream: string, data: any): Promise<void>{
        const params: PutRecordInput = {
			StreamName: stream,
			Data: new TextEncoder().encode(JSON.stringify(data)),
			PartitionKey: '1',
		}
        try{
            await this._kinesis.putRecord(params);
            logger.info('Record published',{params});
        }catch(error){
            logger.info('Failed to publish record',{params});
        }
    }

    public async subscribe(streamName:string, cb: (data: any) => Promise<void>): Promise<void>{
        const iteratorParams = {
        ShardId: 'shardId-000000000000',
        ShardIteratorType: ShardIteratorType.LATEST, // Start from the latest record in the stream
        StreamName: streamName
      };

      this._kinesis.getShardIterator(iteratorParams, (err: any, data: any) => {
        if (err) {
          logger.error('Error getting shard iterator:', err);
          return;
        }
      
        const shardIterator = data.ShardIterator;
      
        // Continuously get records from the shard
        const getRecordsParams = {
          ShardIterator: shardIterator
        };
      
        setInterval(() => {
          this._kinesis.getRecords(getRecordsParams, async (err:any, data:any) => {
            if (err) {
                logger.error('Error getting records:', err);
              return;
            }
      
            // Process received records
            for(const record of data.Records){
                const data = JSON.parse(Buffer.from(record.Data, 'base64').toString('utf-8'));
                await cb(data);
            }
      
            // Update shard iterator for next request
            getRecordsParams.ShardIterator = data.NextShardIterator;
          });
        }, 1000); // Adjust the interval as per requirement
      });
        
    }    
}
