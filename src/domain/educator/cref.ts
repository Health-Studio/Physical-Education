export type Name = string;
export type CREF = string;

export interface Validator {
  valid(name: Name, cref: CREF): Promise<boolean>;
}
