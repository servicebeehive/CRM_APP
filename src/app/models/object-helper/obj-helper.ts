import cloneDeep from '../../../../node_modules/lodash.clonedeep/index.js';

export class ObjHelper {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static CloneDeep<T>(obj: T): T {
    return cloneDeep(obj);
  }
}
