import { LimitPeriod } from "../enums/LimitPeriod";
import { LimitStatus } from "../enums/LimitStatus";
import { LimitType } from "../enums/LimitType";

export interface UserLimit {
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