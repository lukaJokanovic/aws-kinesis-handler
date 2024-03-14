import Joi from 'joi';

export interface IChangeUserLimit {
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
  brandId: Joi.string().required(),
  currencyCode: Joi.string().required(),
  userId: Joi.string().required(),
  userLimitId: Joi.string().required(),
  amount: Joi.string().required(),
  nextResetTime: Joi.number().required(),
  previousProgress: Joi.string().required(),
  remainingAmount: Joi.string().optional(),
}).unknown(true);
