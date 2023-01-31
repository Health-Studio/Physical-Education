export abstract class Pacient {
  protected _id: string;
  protected _cpf: string;
  protected _name: string;
  protected _birthday: Date;
  protected _height: number;
  protected _weight: number;

  constructor(
    id: string,
    cpf: string,
    name: string,
    birthday: Date,
    height: number,
    weight: number
  ) {
    this._id = id;
    this._cpf = cpf;
    this._name = name;
    this._birthday = birthday;
    this._height = height;
    this._weight = weight;
  }

  public abstract imc(): number;
  public abstract lmi(): number;
  public age(): number {
    return new Date().getFullYear() - this._birthday.getFullYear();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get cpf() {
    return this._cpf;
  }

  public get height() {
    return this._height;
  }

  public get weight() {
    return this._weight;
  }
}
