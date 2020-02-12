export interface IDBModel<T> {
  insert: (input: any) => PromiseLike<T>;
  getById: (input: any) => PromiseLike<T>;
  //Special queries
  getAllByPO: (input: any) => PromiseLike<T>;
  /////////////////
  getAll: () => PromiseLike<T>;
  deleteById: (input: any) => PromiseLike<T>;
  updateById: (input: any) => PromiseLike<T>;
}
