import { KinesisService } from "../services/external/Kinesis.service";
import events from './events.json';
import { KinesisConfig } from "../configs/Kinesis.config";

async function insertData(): Promise<void> {
    const kinesisService = new KinesisService();

    for(const event of events){
        await kinesisService.publish(KinesisConfig.USER_EVENTS_STREAM, event);
    }
}

insertData();