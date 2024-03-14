import { ObjectSchema } from "joi";
import { IKinesisService } from "../../services/external/Kinesis.service";
import logger from "../../services/external/Logger.service";
import { StreamHandler } from "../StreamHandler";
import { IUserEventsMessage, userEventsSchema } from "./IUserEvents.message";

export class UserEventsHandler extends StreamHandler<IUserEventsMessage>{
    public schema: ObjectSchema<any> = userEventsSchema;
    constructor(_kinesisService: IKinesisService){
        super('user-events',_kinesisService);
    }
    public async handleStream(message: IUserEventsMessage): Promise<void> {
        logger.info('Handle',{message});
    }
}