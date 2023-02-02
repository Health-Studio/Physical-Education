import { Factory } from "@src/domain/educator/educator";
import { Validator } from "@src/infrastructure/educator/validator/cref.validator";

const validator = new Validator();
const factory = new Factory(validator);
export default factory;
