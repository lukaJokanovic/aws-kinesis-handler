import { UserEventsHandler } from "./handlers/user-events/UserEvents.stream";
import { KinesisService } from "./services/external/Kinesis.service";
import logger from "./services/external/Logger.service";

process
.on('unhandledRejection', (err: any) => {
  logger.error(`Unhandled Rejection at Promise | ${err.message}`, { stack: err.stack });
})
.on('uncaughtException', (err: any) => {
  logger.error(`Uncaught Exception thrown | ${err.message}`, { stack: err.stack });
  process.exit(1);
});

let k = new KinesisService();

let s = new UserEventsHandler(k);

s.subscribe().then(()=>{
    k.publish('user-events',{type:'LIMIT_USER_CREATED',payload:{test:'1'}});
    k.publish('user-events',{type:'USER_LIMIT_PROGRESS_CHANGED',payload:{test:'2'}});
    k.publish('user-events',{type:'USER_LIMIT_RESET',payload:{test:'3'}});
    k.publish('user-events',{type:'FKEKFEKDK',payload:{}});
    k.publish('user-events',{
      "aggregateId": "VijPYTEOgK7dxLs5fBjJ",
      "context": {
        "correlationId": "hVyFHScCNAmSyAPulhtsQ"
      },
      "createdAt": 1647946090594,
      "eventId": "HENgJu3fBmWWtVjlifo4",
      "payload": {
        "activeFrom": 1647946090592,
        "brandId": "000000000000000000000001",
        "currencyCode": "SEK",
        "nextResetTime": 1648032490592,
        "period": "DAY",
        "status": "ACTIVE",
        "type": "DEPOSIT",
        "userId": "VijPYTEOgK7dxLs5fBjJ",
        "userLimitId": "LKMgxoE0yFgH6F6iShEu",
        "value": "10000"
      },
      "sequenceNumber": 3,
      "source": "limitUser",
      "type": "USER_LIMIT_CREATED"
    });
})