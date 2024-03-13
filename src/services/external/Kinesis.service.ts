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
            region: 'eu-west-2',
            credentials: {
				accessKeyId: 'some_id',
				secretAccessKey: 'some_key',
			},
			requestHandler: new NodeHttpHandler() as any
        });
    }

    public async publish(data: any): Promise<void>{
        const params: PutRecordInput = {
			StreamName: 'user-events',
			Data: new TextEncoder().encode(JSON.stringify(data)),
			PartitionKey: '1',
		}
        await this._kinesis.putRecord(params);
    }
}


let k = new KinesisService()

k.publish({ovo:'je test'})