import { UserLimit } from "../../dtos/UserLimit.dto"

export interface IUserLimitRepository {
	get(key: string): Promise<UserLimit>
	save(payload: any): Promise<UserLimit>
	reset(payload: any): Promise<UserLimit>
	update(payload: any): Promise<UserLimit>
}