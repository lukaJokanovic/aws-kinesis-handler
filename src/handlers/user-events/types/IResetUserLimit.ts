import Joi from 'joi';
import { LimitPeriod, LimitType } from './types';

export interface IResetUserLimit {
  brandId: string;
  currencyCode: string;
  nextResetTime: number;
  period: LimitPeriod;
  type: LimitType;
  userId: string;
  userLimitId: string;
  resetAmount: string;
  unusedAmount: string;
  resetPercentage: string;
}

export const userLimitResetPayloadSchema = Joi.object({
  brandId: Joi.string().required(),
  currencyCode: Joi.string().required(),
  userId: Joi.string().required(),
  userLimitId: Joi.string().required(),
  nextResetTime: Joi.number().required(),
  period: Joi.string()
    .valid(...Object.values(LimitPeriod))
    .required(),
  resetAmount: Joi.string().required(),
  unusedAmount: Joi.string().required(),
  resetPercentage: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(LimitType))
    .required(),
}).unknown(true);
