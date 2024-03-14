import { INSUFFICIENT_FUNDS, USER_LIMIT_DOES_NOT_EXIST } from '../../constants/errors';
import { IUserLimit } from '../../handlers/user-events/types/IUserLimit';
import { assert } from '../../utils/utils';
import { IUserLimitRepository } from './IUserLimit.repository';

export class UserLimitInMemoryRepository implements IUserLimitRepository {
  private _db: Map<string, IUserLimit>;

  constructor() {
    this._db = new Map<string, IUserLimit>();
  }

  public async get(key: string): Promise<IUserLimit | undefined> {
    return this._db.get(key);
  }

  public async save(userLimit: IUserLimit): Promise<void> {
    // we are writing ower existing data
    this._db.set(userLimit.userLimitId, userLimit);
  }

  public async update(userLimitId: string, amount: string): Promise<IUserLimit> {
    const userLimit = await this.get(userLimitId);
    assert(userLimit !== undefined, USER_LIMIT_DOES_NOT_EXIST.withDetails({ userLimitId }));

    const newValue = Number(userLimit.value) - Number(amount ?? 0);
    assert(newValue < 0, INSUFFICIENT_FUNDS.withDetails({ newValue, amount }));

    userLimit.value = newValue.toString();

    return userLimit;
  }

  public async reset(userLimitId: string, resetAmount: string, nextResetTime: number): Promise<IUserLimit> {
    const userLimit = await this.get(userLimitId);
    assert(userLimit !== undefined, USER_LIMIT_DOES_NOT_EXIST.withDetails({ userLimitId }));

    userLimit.value = resetAmount;
    userLimit.nextResetTime = nextResetTime;

    return userLimit;
  }
}
