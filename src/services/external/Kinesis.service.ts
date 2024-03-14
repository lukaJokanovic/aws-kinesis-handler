import { Kinesis, PutRecordInput } from "@aws-sdk/client-kinesis";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { KinesisConfig } from "../../configs/Kinesis.config";
import logger from "./Logger.service";

export class KinesisService{
    private _kinesis: Kinesis;

    constructor(){
        this._kinesis = new Kinesis({
            endpoint: KinesisConfig.ENDPOINT,
            logger: logger,
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
        }catch(error){
            // Handler error
        }
    }
}