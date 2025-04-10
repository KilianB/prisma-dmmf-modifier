import { Datamodel } from "./datamodel";
import { type DmmfDatamodel } from "./types";

export abstract class DMMFCommand {
  abstract do(datamodel: Datamodel): void;
  abstract undo(datamodel: Datamodel): void;
}

export class DMMfModifier {
  private history: DMMFCommand[] = [];
  private datamodel: Datamodel;
  constructor(datamodel: DmmfDatamodel) {
    this.datamodel = new Datamodel(datamodel);
  }
  get() {
    return this.datamodel.get();
  }
  getModelsNames() {
    const datamodel = this.datamodel.get();
    return datamodel.models.map((m) => m.name);
  }
  getEnumsNames() {
    const datamodel = this.datamodel.get();
    return datamodel.enums.map((m) => m.name);
  }
  getEnumOptions(enumName: string) {
    const datamodel = this.datamodel.get();
    return datamodel.enums
      .find((e) => e.name === enumName)!
      .values.map((v) => v.name);
  }
  set(datamodel: DmmfDatamodel) {
    this.history = [];
    this.datamodel = new Datamodel(datamodel);
  }
  do(command: DMMFCommand) {
    command.do(this.datamodel);
    this.history.push(command);
  }
  undo() {
    const command = this.history.pop();
    if (command) command.undo(this.datamodel);
  }
}
