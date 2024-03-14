import { IUserLimit } from '../../handlers/user-events/types/IUserLimit';

export interface IUserLimitRepository {
  get(key: string): Promise<IUserLimit | undefined>;
  save(userLimit: IUserLimit): Promise<void>;
  update(userLimitId: string, amount: string): Promise<IUserLimit>;
  reset(userLimitId: string, resetAmount: string, nextResetTime: number): Promise<IUserLimit>;
}
