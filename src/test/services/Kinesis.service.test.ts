import { expect } from 'chai';
import sinon from 'sinon';
import { Kinesis } from '@aws-sdk/client-kinesis';
import logger from '../../services/external/Logger.service';
import { IKinesisService, KinesisService } from '../../services/external/Kinesis.service';

describe('KinesisService', () => {
  let kinesisService: IKinesisService;
  let putRecordStub: sinon.SinonStub;
  // let getShardIteratorStub: sinon.SinonStub;
  // let getRecordsStub: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    // Stubbing Kinesis client methods
    putRecordStub = sandbox.stub(Kinesis.prototype, 'putRecord').resolves();
    // getShardIteratorStub = sandbox
    //   .stub(Kinesis.prototype, 'getShardIterator')
    //   .callsArgWith(1, null, { ShardIterator: 'dummyShardIterator' });
    // getRecordsStub = sandbox
    //   .stub(Kinesis.prototype, 'getRecords')
    //   .callsArgWith(1, null, { Records: [], NextShardIterator: 'dummyNextShardIterator' });

    kinesisService = new KinesisService();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('publish', async () => {
    it('should publish record to the stream', async () => {
      await kinesisService.publish('testStream', { message: 'Test message' });

      expect(putRecordStub.calledOnce).to.be.true;
      expect(putRecordStub.firstCall.args[0]).to.deep.equal({
        StreamName: 'testStream',
        Data: Uint8Array.from([
          123, 34, 109, 101, 115, 115, 97, 103, 101, 34, 58, 34, 84, 101, 115, 116, 32, 109, 101, 115, 115, 97, 103,
          101, 34, 125,
        ]),
        PartitionKey: '1',
      });
    });

    it('should log success message when record is published', async () => {
      const loggerInfoStub = sandbox.stub(logger, 'info');

      await kinesisService.publish('testStream', { message: 'Test message' });

      expect(loggerInfoStub.calledOnce).to.be.true;
      expect(loggerInfoStub.firstCall.args[0]).to.equal('Record published');
    });

    it('should log error message when record publishing fails', async () => {
      putRecordStub.rejects(new Error('Failed to publish record'));
      const loggerErrorStub = sandbox.stub(logger, 'error');

      await kinesisService.publish('testStream', { message: 'Test message' });

      expect(loggerErrorStub.calledOnce).to.be.true;
      expect(loggerErrorStub.firstCall.args[0]).to.equal('Failed to publish record');
    });
  });
});
