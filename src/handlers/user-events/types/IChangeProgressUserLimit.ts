import Joi from 'joi';

export interface IChangeProgressUserLimit {
  brandId: string;
  currencyCode: string;
  nextResetTime?: number;
  userId: string;
  userLimitId: string;
  amount: string;
  previousProgress: string;
  remainingAmount: string;
}

export const userLimitProgressChangedSchema = Joi.object({
  userLimitId: Joi.string().required(),
  amount: Joi.string().required(),
}).unknown(true);
