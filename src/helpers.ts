import type { DMMF } from "@prisma/generator-helper";
import type { Mutable, DmmfDatamodel } from "./types";

export const addFieldWithSafeName = (
  datamodel: Mutable<DmmfDatamodel>,
  modelName: string,
  field: Mutable<DMMF.Field>
) => {
  const dmmf = datamodel.models;
  const currentModel = dmmf.find((model) => model.name === modelName)!;
  const fieldNames = currentModel.fields.map((field) => field.name);
  let fieldName = field.name;
  let digit = 1;
  while (fieldNames.includes(fieldName)) {
    fieldName = `${field.name}${digit}`;
    digit++;
  }
  field.name = fieldName;

  dmmf.forEach((model) => {
    if (model.name === modelName) {
      model.fields.push(field);
    }
  });

  return field.name;
};
export const addEnumFieldWithSafeName = (
  datamodel: Mutable<DmmfDatamodel>,
  enumName: string,
  field: string
) => {
  const dmmf = datamodel.enums;
  const currentModel = dmmf.find((e) => e.name === enumName)!;
  const fieldNames = currentModel.values.map((field) => field.name);
  let fieldName = field;
  let digit = 1;
  while (fieldNames.includes(fieldName)) {
    fieldName = `${field}${digit}`;
    digit++;
  }

  dmmf.forEach((model) => {
    if (model.name === enumName) {
      model.values.push({ name: fieldName, dbName: null });
    }
  });

  return fieldName;
};
