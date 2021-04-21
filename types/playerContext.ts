import { ContextObj, ExternalUrlObj } from "../structures/structs.ts";

export class PlayerContext {
  #data: ContextObj;

  constructor(data: ContextObj) {
    this.#data = data;
  }

  get externalUrls(): ExternalUrlObj {
    return this.#data.external_urls;
  }
  get href(): string {
    return this.#data.href;
  }
  get type(): string {
    return this.#data.type;
  }
  get uri(): string {
    return this.#data.uri;
  }
}
