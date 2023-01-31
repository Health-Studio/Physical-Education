import { v4 as uuid } from "uuid";
import * as CREF from "./cref";
import { Pacient } from "./pacient";

type Id = string;
type Name = string;
type CREF = CREF.CREF;
type Pacients = Array<Pacient>;

export default class Educator {
  private _id: Id;
  private _name: Name;
  private _cref: CREF;
  private _pacients: Pacients;

  private constructor(name: Name, cref: CREF, pacients: Pacients, id?: Id) {
    if (id) this._id = id;
    else this._id = uuid();
    this._name = name;
    this._cref = cref;
    this._pacients = pacients;
  }

  static Factory = class {
    private validator: CREF.Validator;

    constructor(validator: CREF.Validator) {
      this.validator = validator;
    }

    public async build(
      name: Name,
      cref: CREF,
      pacients: Pacients
    ): Promise<Educator> {
      const isValid = await this.validator.valid(name, cref);
      if (isValid) {
        return new Educator(name, cref, pacients);
      }
      throw new Error("");
    }
  };

  public get id(): Id {
    return this._id;
  }

  public get name(): Name {
    return this._name;
  }

  public get cref(): CREF {
    return this._cref;
  }

  public get pacients(): Pacients {
    return this._pacients;
  }
}
