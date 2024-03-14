import Joi from "joi";

export type EventType = 'LIMIT_USER_CREATED' | 'USER_LIMIT_PROGRESS_CHANGED' | 'USER_LIMIT_RESET';

const allowedEventTypes: EventType[] =['LIMIT_USER_CREATED','USER_LIMIT_PROGRESS_CHANGED','USER_LIMIT_RESET']

export const userEventsSchema = Joi.object({
    payload: Joi.object().required(),
    type: Joi.string().valid(...allowedEventTypes).required()
}).unknown(true);


export interface IUserEventsMessage {
    payload: any;
    type: EventType;
  }
  