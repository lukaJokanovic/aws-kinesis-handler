import Joi from "joi";

export interface IUserEventsMessage {
    payload: any;
    type: EventType;
}

export enum EventType {
	USER_LIMIT_CREATED = 'USER_LIMIT_CREATED',
	USER_LIMIT_PROGRESS_CHANGED = 'USER_LIMIT_PROGRESS_CHANGED',
	USER_LIMIT_RESET = 'USER_LIMIT_RESET',
}

export const userEventsSchema = Joi.object({
    payload: Joi.object().required(),
    type: Joi.string().valid(...Object.values(EventType)).required()
}).unknown(true);

  