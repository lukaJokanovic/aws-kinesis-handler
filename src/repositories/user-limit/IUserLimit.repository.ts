import { IUserLimit } from '../../handlers/user-events/types/IUserLimit';

export interface IUserLimitRepository {
  get(key: string): Promise<IUserLimit>;
  save(payload: any): Promise<IUserLimit>;
  reset(payload: any): Promise<IUserLimit>;
  update(payload: any): Promise<IUserLimit>;
}
