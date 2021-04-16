import { Caller } from "../handlers/caller.ts";
import { CategoryObj, ImageObj } from "../types.ts";

export class Category {
  #caller: Caller;
  #data: CategoryObj;

  constructor(data: CategoryObj, caller: Caller) {
    this.#caller = caller;
    this.#data = data;
  }

  get href(): string {
    return this.#data.href;
  }

  get icons(): Array<ImageObj> {
    return this.#data.icons;
  }

  get id(): string {
    return this.#data.id;
  }

  get name(): string {
    return this.#data.name;
  }
}
