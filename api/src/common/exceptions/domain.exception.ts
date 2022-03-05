export class DomainException extends Error {
  constructor(private data: Record<string, any> = {}) {
    super();
  }

  public getData() {
    return this.data;
  }
}
