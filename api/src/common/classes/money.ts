export class Money {
  private constructor(private amount: number) {}

  static of(amount: number) {
    return new Money(amount);
  }

  public add(addend: number) {
    const amountInCents = this.convertToCents(this.amount);
    const addendInCents = this.convertToCents(addend);
    const result = amountInCents + addendInCents;
    this.amount = this.convertFromCents(result);
    return this;
  }

  public subtract(subtrahend: number) {
    const amountInCents = this.convertToCents(this.amount);
    const subtrahendInCents = this.convertToCents(subtrahend);
    const result = amountInCents - subtrahendInCents;
    this.amount = this.convertFromCents(result);
    return this;
  }

  public multiply(multiplier: number) {
    const amountInCents = this.convertToCents(this.amount);
    const result = Math.floor(amountInCents * multiplier);
    this.amount = this.convertFromCents(result);
    return this;
  }

  public divide(divider: number) {
    const amountInCents = this.convertToCents(this.amount);
    const result = Math.floor(amountInCents / divider);
    this.amount = this.convertFromCents(result);
    return this;
  }

  public getAmount() {
    return this.amount;
  }

  private convertToCents = (value: number) => Math.floor(value * 100);
  private convertFromCents = (value: number) => +(value * 0.01).toFixed(2);
}
