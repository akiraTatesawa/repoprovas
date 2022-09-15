export interface IRepoCreate<T> {
  create(data: T): Promise<void>;
}

export interface IRepoGetById<O> {
  getById(id: number): Promise<O | null>;
}
