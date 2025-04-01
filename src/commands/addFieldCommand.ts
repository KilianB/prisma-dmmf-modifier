import type { DMMF } from "@prisma/generator-helper";
import { DMMFCommand } from "../dmmfModifier";
import type { Datamodel } from "../datamodel";
import type { Mutable } from "../types";

export class AddFieldCommand extends DMMFCommand {
  constructor(
    private modelName: string,
    private field: Mutable<DMMF.Field>,
    private isManyToManyRelation?: boolean
  ) {
    super();
  }

  do(datamodel: Datamodel) {
    const relationType: "1-1" | "1-n" | "n-m" | undefined = this.field
      .relationName
      ? this.isManyToManyRelation
        ? "n-m"
        : this.field.isList
        ? "1-n"
        : "1-1"
      : undefined;
    datamodel.addField(this.modelName, this.field, relationType);
  }

  undo(datamodel: Datamodel) {
    datamodel.removeField(this.modelName, this.field);
  }
}
