export class HttpResponse<T = {}> {
  public isSuccess: boolean = false;
  public message?: string;
  public status?: number;
  public data?: T;

  constructor(init?: Partial<HttpResponse>) {
    Object.assign(this, init);
  }

  public getIsSuccess() {
    return this.isSuccess;
  }

  public getMessage() {
    return this.message;
  }

  public getStatus() {
    return this.status;
  }

  public getData() {
    return this.data;
  }
}
