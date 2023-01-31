export default class Educator {
  private _name: string;
  private _cref: string;

  constructor(name: string, cref: string) {
    this._name = name;
    this._cref = cref;
  }

  public get name(): string {
    return this._name;
  }

  public get cref(): string {
    return this._cref;
  }
}
