export interface IServiceExecute<T, O> {
  execute(data: T): Promise<O>;
}
