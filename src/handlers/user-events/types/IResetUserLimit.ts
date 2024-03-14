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
  userLimitId: Joi.string().required(),
  nextResetTime: Joi.number().required(),
  resetAmount: Joi.string().required(),
}).unknown(true);
