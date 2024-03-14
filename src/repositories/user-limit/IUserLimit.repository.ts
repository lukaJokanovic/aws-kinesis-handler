import { UserLimit } from "../../handlers/user-events/types/IUserLimit"

export interface IUserLimitRepository {
	get(key: string): Promise<UserLimit>
	save(payload: any): Promise<UserLimit>
	reset(payload: any): Promise<UserLimit>
	update(payload: any): Promise<UserLimit>
}