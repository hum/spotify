import {
  ExplicitContentSettingsObj,
  PrivateUserObj,
} from "../structures/structs.ts";
import { PublicUser } from "./types.ts";

export class PrivateUser extends PublicUser {
  #data: PrivateUserObj;

  constructor(data: PrivateUserObj) {
    super(data);
    this.#data = data;
  }

  get country(): string {
    return this.#data.country;
  }

  get email(): string {
    return this.#data.email;
  }

  get explicitContent(): ExplicitContentSettingsObj {
    return this.#data.explicit_content;
  }

  get product(): string {
    return this.#data.product;
  }
}
