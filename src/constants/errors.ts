export class ErrorReport extends Error{
    constructor(message: string, public details?: any) {
		super(message);
		this.name = this.constructor.name;
	}

  public withDetails(details: any): ErrorReport {
    return new ErrorReport(this.message, details);
  }
}

export const USER_LIMIT_DOES_NOT_EXIST = new ErrorReport('User limit does not exist');
export const INSUFFICIENT_FUNDS = new ErrorReport('Insufficient funds');

export const METHOD_NOT_IMPLEMENTED = new ErrorReport('Method not implemented yet');
