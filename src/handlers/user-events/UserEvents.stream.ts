import Joi, { ObjectSchema } from "joi";
import { IKinesisService } from "../../services/external/Kinesis.service";
import logger from "../../services/external/Logger.service";
import { StreamHandler } from "../StreamHandler";
import { EventType, IUserEventsMessage, userEventsSchema } from "./IUserEvents.message";
import { userLimitCreatedSchema, UserLimitProgressChangedSchema, UserLimitResetPayloadSchema } from "./types/schemas";
import { UserLimit } from "./types/IUserLimit";

export class UserEventsHandler extends StreamHandler<IUserEventsMessage>{
    public schema: ObjectSchema<any> = userEventsSchema;
    constructor(_kinesisService: IKinesisService){
        super('user-events',_kinesisService);
    }
    public async handleStream(message: IUserEventsMessage): Promise<void> {
        logger.info('Handle',{message});
        switch(message.type){
            case EventType.USER_LIMIT_CREATED:
                await this.handleUserLimitCreated(message.payload);
                return;
            case EventType.USER_LIMIT_PROGRESS_CHANGED:
                await this.handleUserLimitProgressChanged(message.payload);
                return;
            case EventType.USER_LIMIT_RESET:
                await this.handleUserLimitReset(message.payload);
                return;
            default:
                throw Error('not implemented')
        }
    }


    private async handleUserLimitCreated(data: UserLimit): Promise<void>{
        this.validate(data, userLimitCreatedSchema);
        logger.info('Hello from handleUserLimitCreated',{data})
    }

    private async handleUserLimitReset(data: any): Promise<void>{
        this.validate(data, UserLimitResetPayloadSchema);
        logger.info('Hello from handleUserLimitReset',{data})
    }

    private async handleUserLimitProgressChanged(data: any): Promise<void>{
        this.validate(data, UserLimitProgressChangedSchema);
        logger.info('Hello from handleUserLimitProgressChanged',{data})
    }
}