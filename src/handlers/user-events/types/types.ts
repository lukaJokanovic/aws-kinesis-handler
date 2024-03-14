export enum LimitPeriod {
    CALENDAR_DAY = 'CALENDAR_DAY',
    CALENDAR_WEEK = 'CALENDAR_WEEK',
    CALENDAR_MONTH = 'CALENDAR_MONTH',
    DAY = 'DAY',
    INDEFINITE = 'INDEFINITE',
    INSTANCE = 'INSTANCE',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
  }

  export enum LimitStatus {
    ACTIVE = 'ACTIVE',
    CANCELED = 'CANCELED',
    FUTURE = 'FUTURE',
    IN_COOLDOWN = 'IN_COOLDOWN',
  }
  
  export enum LimitType {
    BALANCE = 'BALANCE',
    BET = 'BET',
    DEPOSIT = 'DEPOSIT',
    LOSS = 'LOSS',
    SESSION = 'SESSION',
  }