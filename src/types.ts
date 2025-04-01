import { type DMMF } from "@prisma/generator-helper";

export type Mutable<T> = {
    -readonly [K in keyof T]: Mutable<T[K]>;
};

export type DmmfDatamodel = DMMF.Document["datamodel"];
export type MutableDmmfDatamodel = Mutable<DmmfDatamodel>;