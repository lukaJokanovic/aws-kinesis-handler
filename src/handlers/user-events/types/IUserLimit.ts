import Joi from "joi";
import { LimitPeriod, LimitStatus, LimitType } from "./types";

export interface IUserLimit {
    activeFrom: number;
    activeUntil?: number;
    brandId: string;
    createdAt?: number;
    currencyCode: string;
    nextResetTime?: number;
    period: LimitPeriod;
    previousLimitValue?: string;
    progress?: string;
    status: LimitStatus;
    type: LimitType;
    userId: string;
    userLimitId: string;
    value: string;
}


export const userLimitCreatedSchema = Joi.object({
  activeFrom: Joi.number().required(),
activeUntil: Joi.number().optional(),
  brandId: Joi.string().required(),
createdAt: Joi.number().optional(),
currencyCode: Joi.string().required(),
nextResetTime: Joi.number().optional(),
period: Joi.string().valid(...Object.values(LimitPeriod)).required(),
previousLimitValue: Joi.string().optional(),
progress: Joi.string().optional(),
status: Joi.string().valid(...Object.values(LimitStatus)).required(),
type: Joi.string().valid(...Object.values(LimitType)).required(),
userId: Joi.string().required(),
userLimitId: Joi.string().required(),
  value: Joi.string().required(),
}).unknown(true);
