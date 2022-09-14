export interface IRepoCreate<T> {
  create(data: T): Promise<void>;
}
