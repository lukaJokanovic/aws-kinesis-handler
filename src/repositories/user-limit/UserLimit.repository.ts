import { UserLimit } from "../../dtos/UserLimit.dto";
import { IUserLimitRepository } from "./IUserLimit.repository";

export class UserLimitRepository implements IUserLimitRepository{
    public async get(key: string): Promise<UserLimit> {
        throw new Error("Method not implemented.");
    }
    public async save(payload: any): Promise<UserLimit> {
        throw new Error("Method not implemented.");
    }
    public async reset(payload: any): Promise<UserLimit> {
        throw new Error("Method not implemented.");
    }
    public async update(payload: any): Promise<UserLimit> {
        throw new Error("Method not implemented.");
    }
}