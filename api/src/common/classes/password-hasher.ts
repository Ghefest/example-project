import { hash, compare } from 'bcrypt';

export class PasswordHasher {
  private static SALT = 4;

  static async hash(password: string) {
    return hash(password, this.SALT);
  }

  static async compare(attempt: string, password: string) {
    return compare(attempt, password);
  }
}
