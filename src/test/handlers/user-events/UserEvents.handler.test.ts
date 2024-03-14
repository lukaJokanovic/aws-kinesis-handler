import { expect } from 'chai';
import sinon from 'sinon';
import { METHOD_NOT_IMPLEMENTED } from '../../../constants/errors';
import { EventType, IUserEventsMessage } from '../../../handlers/user-events/IUserEvents.message';
import { IChangeProgressUserLimit } from '../../../handlers/user-events/types/IChangeProgressUserLimit';
import { IResetUserLimit } from '../../../handlers/user-events/types/IResetUserLimit';
import { IUserLimit } from '../../../handlers/user-events/types/IUserLimit';
import { LimitPeriod, LimitStatus, LimitType } from '../../../handlers/user-events/types/types';
import { UserEventsHandler } from '../../../handlers/user-events/UserEvents.handler';
import { UserLimitInMemoryRepository } from '../../../repositories/user-limit/UserLimitInMemory.repository';
import { KinesisService } from '../../../services/external/Kinesis.service';

describe('UserEventsHandler', () => {
  let handler: UserEventsHandler;
  let sandbox: sinon.SinonSandbox;
  let saveSub: sinon.SinonStub;
  let resetSub: sinon.SinonStub;
  let updateSub: sinon.SinonStub;

  before(() => {
    sandbox = sinon.createSandbox();
    handler = new UserEventsHandler(new KinesisService(), new UserLimitInMemoryRepository());
  });

  beforeEach(() => {
    // Reset the mocks before each test
    sandbox.stub(KinesisService.prototype, 'subscribe').resolves();
    saveSub = sandbox.stub(UserLimitInMemoryRepository.prototype, 'save');
    resetSub = sandbox.stub(UserLimitInMemoryRepository.prototype, 'reset');
    updateSub = sandbox.stub(UserLimitInMemoryRepository.prototype, 'update');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('handleStream', () => {
    it('should call corresponding handler method based on event type', async () => {
      const testData = {
        eventId: '123',
        type: EventType.USER_LIMIT_CREATED,
        payload: {
          userLimitId: '456',
          value: '100',
          progress: '50',
          nextResetTime: 0,
        },
        context: {},
        createdAt: Date.now(),
        aggregateId: '789',
        sequenceNumber: 1,
        source: 'testSource',
      } as IUserEventsMessage;

      const handleUserLimitCreatedStub = sandbox.stub(handler as any, 'handleUserLimitCreated');
      await handler.handleStream(testData);

      expect(handleUserLimitCreatedStub.calledOnceWith(testData.payload)).to.be.true;
    });

    it('should throw METHOD_NOT_IMPLEMENTED error for unknown event type', async () => {
      const testData = {
        eventId: '123',
        type: 'UNKNOWN_EVENT_TYPE' as EventType,
        payload: {},
        context: {},
        createdAt: Date.now(),
        aggregateId: '789',
        sequenceNumber: 1,
        source: 'testSource',
      } as IUserEventsMessage;

      await expect(handler.handleStream(testData)).to.be.rejectedWith(METHOD_NOT_IMPLEMENTED);
    });
  });

  describe('handleUserLimitCreated', () => {
    it('should validate and save user limit to repository', async () => {
      const testData: IUserLimit = {
        userLimitId: '456',
        value: '100',
        progress: '50',
        nextResetTime: 0,
        activeFrom: 0,
        brandId: 'SSS',
        currencyCode: 'RSD',
        period: LimitPeriod.CALENDAR_MONTH,
        status: LimitStatus.ACTIVE,
        type: LimitType.BET,
        userId: 'id',
      };

      await (handler as any).handleUserLimitCreated(testData);

      expect(saveSub.calledOnceWith(testData)).to.be.true;
    });
    it('invalid object received', async () => {
      const testData = {
        userLimitId: '456',
        value: '100',
        progress: '50',
        nextResetTime: 0,
        activeFrom: 0,
        brandId: 'SSS',
        currencyCode: 'RSD',
        userId: 'id',
      } as IUserLimit;

      await expect((handler as any).handleUserLimitCreated(testData)).to.be.rejected;
    });
  });

  describe('handleUserLimitReset', () => {
    it('should validate and reset user limit in repository', async () => {
      const testData: IResetUserLimit = {
        userLimitId: '456',
        resetAmount: '25',
        nextResetTime: 1234567890,
        brandId: 'ssssss',
        currencyCode: 'RSD',
        period: LimitPeriod.CALENDAR_DAY,
        type: LimitType.BALANCE,
        userId: 'id2',
        unusedAmount: '3433434',
        resetPercentage: '30',
      };

      await (handler as any).handleUserLimitReset(testData);

      expect(resetSub.calledOnceWith(testData.userLimitId, testData.resetAmount, testData.nextResetTime)).to.be.true;
    });
    it('invalid object received', async () => {
      const testData = {
        userLimitId: '456',
        resetAmount: '25',
      } as IResetUserLimit;

      await expect((handler as any).handleUserLimitReset(testData)).to.be.rejected;
    });
  });

  describe('handleUserLimitProgressChanged', () => {
    it('should validate and update user limit progress in repository', async () => {
      const testData: IChangeProgressUserLimit = {
        userLimitId: '456',
        amount: '25',
        brandId: 'SS',
        currencyCode: 'EUR',
        userId: 'id3',
        previousProgress: '20',
        remainingAmount: '20',
      };

      await (handler as any).handleUserLimitProgressChanged(testData);

      expect(updateSub.calledOnceWith(testData.userLimitId, testData.amount)).to.be.true;
    });
    it('invalid object received', async () => {
      const testData = {
        amount: '25',
        userId: 'id3',
        previousProgress: '20',
        remainingAmount: '20',
      } as IChangeProgressUserLimit;

      await expect((handler as any).handleUserLimitProgressChanged(testData)).to.be.rejected;
    });
  });
});
