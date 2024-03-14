import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { IUserLimit } from '../../handlers/user-events/types/IUserLimit';
import { UserLimitInMemoryRepository } from '../../repositories/user-limit/UserLimitInMemory.repository';

// Use chai-as-promised plugin
chai.use(chaiAsPromised);

describe('UserLimitInMemoryRepository', () => {
  let repository: UserLimitInMemoryRepository;

  beforeEach(() => {
    repository = new UserLimitInMemoryRepository();
  });

  describe('get', () => {
    it('should return undefined for non-existing key', async () => {
      const result = await repository.get('non-existing-key');
      expect(result).to.be.undefined;
    });

    it('should return stored value for existing key', async () => {
      const userLimit = { userLimitId: '123', value: '100', progress: '50', nextResetTime: 0 } as IUserLimit;
      repository.save(userLimit);

      const result = await repository.get('123');
      expect(result).to.deep.equal(userLimit);
    });
  });

  describe('save', () => {
    it('should store user limit in the repository', async () => {
      const userLimit = { userLimitId: '123', value: '100', progress: '50', nextResetTime: 0 } as IUserLimit;
      await repository.save(userLimit);

      const result = await repository.get('123');
      expect(result).to.deep.equal(userLimit);
    });
  });

  describe('update', () => {
    it('should throw error if user limit does not exist', async () => {
      const userLimitId = 'non-existing-id';
      await expect(repository.update(userLimitId, '50')).to.be.rejected;
    });

    it('should throw error if amount exceeds user limit', async () => {
      const userLimit = { userLimitId: '123', value: '100', progress: '50', nextResetTime: 0 } as IUserLimit;
      repository.save(userLimit);

      await expect(repository.update('123', '200')).to.be.rejected;
    });

    it('should update user limit progress', async () => {
      const userLimit = { userLimitId: '123', value: '100', progress: '50', nextResetTime: 0 } as IUserLimit;
      repository.save(userLimit);

      const updatedUserLimit = await repository.update('123', '25');
      expect(updatedUserLimit.progress).to.equal('75');
    });
  });

  describe('reset', () => {
    it('should throw error if user limit does not exist', async () => {
      await expect(repository.reset('non-existing-id', '50', 0)).to.be.rejected;
    });

    it('should reset user limit progress and next reset time', async () => {
      const userLimit = { userLimitId: '123', value: '100', progress: '50', nextResetTime: 0 } as IUserLimit;
      repository.save(userLimit);

      const resetAmount = '25';
      const nextResetTime = 1234567890;
      const updatedUserLimit = await repository.reset('123', resetAmount, nextResetTime);
      expect(updatedUserLimit.progress).to.equal(resetAmount);
      expect(updatedUserLimit.nextResetTime).to.equal(nextResetTime);
    });
  });
});
