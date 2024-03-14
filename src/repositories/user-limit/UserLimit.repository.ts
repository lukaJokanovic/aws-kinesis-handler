import { IUserLimit } from '../../handlers/user-events/types/IUserLimit';
import { IUserLimitRepository } from './IUserLimit.repository';

export class UserLimitRepository implements IUserLimitRepository {
  public async get(key: string): Promise<IUserLimit> {
    throw new Error('Method not implemented.');
  }
  public async save(payload: any): Promise<IUserLimit> {
    throw new Error('Method not implemented.');
  }
  public async reset(payload: any): Promise<IUserLimit> {
    throw new Error('Method not implemented.');
  }
  public async update(payload: any): Promise<IUserLimit> {
    throw new Error('Method not implemented.');
  }
}
