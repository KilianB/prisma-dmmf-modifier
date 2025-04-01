import { type DMMF } from "@prisma/generator-helper";
import { DMMFCommand } from "../dmmfModifier";
import { type Datamodel } from "../datamodel";
import { Mutable } from "../types";

export class UpdateFieldCommand extends DMMFCommand {
  constructor(
    private modelName: string,
    private originalFieldName: string,
    private field: Mutable<Partial<DMMF.Field>>,
    private isManyToManyRelation: boolean
  ) {
    super();
  }

  do(datamodel: Datamodel) {
    datamodel.updateField(
      this.modelName,
      this.originalFieldName,
      this.field,
      this.isManyToManyRelation
    );
  }
  undo(): void {
    // todo
    throw new Error("Method not implemented.");
  }
}
