export interface APIProviderInterface {
  auth(authData): Promise<any>;

  on(eventName: string, callback): void;

  off(eventName: string, callback): void;

  emit(eventName: string, data): void;
}
