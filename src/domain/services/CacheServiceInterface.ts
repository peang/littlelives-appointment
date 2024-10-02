
export interface CacheServiceInterface {
  saveObject(key: string, object: Record<string, any>, expire?: number): Promise<void>;

  getObject(key: string): Promise<Record<string, any>>;

  remove(key: string): Promise<void>;
}