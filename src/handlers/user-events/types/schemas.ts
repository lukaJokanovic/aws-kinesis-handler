import Joi from "joi";
import { LimitPeriod, LimitStatus, LimitType } from "./IUserLimit";

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


export const UserLimitProgressChangedSchema = Joi.object({
    brandId: Joi.string().required(),
	currencyCode: Joi.string().required(),
	userId: Joi.string().required(),
	userLimitId: Joi.string().required(),
	amount: Joi.string().required(),
	nextResetTime: Joi.number().required(),
	previousProgress: Joi.string().required(),
	remainingAmount: Joi.string().optional(),
}).unknown(true);


export const UserLimitResetPayloadSchema = Joi.object({
    brandId: Joi.string().required(),
	currencyCode: Joi.string().required(),
	userId: Joi.string().required(),
	userLimitId: Joi.string().required(),
	nextResetTime: Joi.number().required(),
	period: Joi.string().valid(...Object.values(LimitPeriod)).required(),
	resetAmount: Joi.string().required(),
	unusedAmount: Joi.string().required(),
	resetPercentage: Joi.string().required(),
	type: Joi.string().valid(...Object.values(LimitType)).required(),
}).unknown(true);