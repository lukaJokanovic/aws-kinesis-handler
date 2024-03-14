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

let k = new KinesisService()

k.subscribe('user-events',async (data)=>{
  setTimeout(()=>{
    logger.info('Received',{data})
  },1000);
}).then(()=>{
    k.publish('user-events',{ovo:'je test1'})
    k.publish('user-events',{ovo:'je test2'})
    k.publish('user-events',{ovo:'je test3'})
    k.publish('user-events',{ovo:'je test4'})
})