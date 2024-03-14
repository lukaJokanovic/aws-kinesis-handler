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
})