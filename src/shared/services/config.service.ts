export class ConfigService {
  get jwtSecret(): string {
    return "fakesecret";
  }
  get jwtExpirationTime(): string {
    return "1h";
  }

}