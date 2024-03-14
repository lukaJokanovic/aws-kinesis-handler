import { expect } from 'chai';
import sinon from 'sinon';
import Joi from 'joi';
import { KinesisService } from '../../services/external/Kinesis.service';
import { StreamHandler } from '../../handlers/StreamHandler';
import logger from '../../services/external/Logger.service';

describe('StreamHandler', () => {
  let handler: TestStreamHandler;
  let sandbox: sinon.SinonSandbox;
  let subscribeStub: sinon.SinonStub;

  before(() => {
    sandbox = sinon.createSandbox();
    handler = new TestStreamHandler('testStream', new KinesisService());
  });

  beforeEach(() => {
    // Reset the mock before each test
    subscribeStub = sandbox.stub(KinesisService.prototype, 'subscribe').resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('subscribe', () => {
    it('should subscribe to the stream', async () => {
      await handler.subscribe();

      expect(subscribeStub.calledOnceWith('testStream', sinon.match.func)).to.be.true;
    });

    it('should log error if subscription fails', async () => {
      subscribeStub.rejects(new Error('Failed to subscribe'));
      const loggerErrorStub = sandbox.stub(logger, 'error');

      await handler.subscribe();

      expect(loggerErrorStub.calledOnce).to.be.true;
      expect(loggerErrorStub.firstCall.args[0]).to.equal('Failed to subscribe to stream');
    });
  });

  describe('subscribeToStream', () => {
    it('should handle stream message and log success', async () => {
      const testData = { value: 'testValue' };

      // Stub the validate method to bypass validation for testing
      sandbox.stub(handler as any, 'validate').returns(testData);

      const loggerInfoStub = sandbox.stub(logger, 'info');

      await handler['subscribeToStream'](testData);

      //   expect(handler.handleStream.calledOnceWith(testData)).to.be.true;
      expect(loggerInfoStub.calledOnce).to.be.true;
      expect(loggerInfoStub.firstCall.args[0]).to.equal('Message handled');
    });

    it('should log error if validation fails', async () => {
      const testData = { value: 'testValue' };
      const error = new Error('Validation failed');

      // Stub the validate method to throw an error for testing
      sandbox.stub(handler as any, 'validate').throws(error);

      const loggerErrorStub = sandbox.stub(logger, 'error');

      await handler['subscribeToStream'](testData);

      expect(loggerErrorStub.calledOnce).to.be.true;
      expect(loggerErrorStub.firstCall.args[0]).to.equal('failed to handle message');
      expect(loggerErrorStub.firstCall.args[1]).to.deep.equal({ error, data: testData });
    });
  });
});

// Define a TestStreamHandler class extending StreamHandler for testing purposes
class TestStreamHandler extends StreamHandler<{ value: string }> {
  public schema = Joi.object({
    value: Joi.string().required(),
  });

  public handleStream(): Promise<void> {
    return Promise.resolve();
  }
}
